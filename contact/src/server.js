const http = require('http');
require('dotenv').config();

const {
    sendTelegramMessage
} = require('./services/telegram');

const PORT = process.env.PORT || 3000;

const MAX_BODY_SIZE = 10_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 5_000;

// Rate limit:
// Máximo 5 solicitudes por IP cada 15 minutos.
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimit = new Map();

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify(data));
}

function getClientIp(req) {
    // Nginx nos proporcionará la IP real mediante X-Real-IP.
    return (
        req.headers['x-real-ip'] ||
        req.socket.remoteAddress ||
        'unknown'
    );
}

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimit.get(ip);

    if (!entry) {
        rateLimit.set(ip, {
            count: 1,
            firstRequest: now
        });

        return false;
    }

    if (now - entry.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, {
            count: 1,
            firstRequest: now
        });

        return false;
    }

    entry.count++;

    return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function validateContact(data) {
    if (!data || typeof data !== 'object') {
        return 'Invalid request body';
    }

    const {
        contactMethod,
        name,
        message,
        honeypot
    } = data;

    // Si el honeypot contiene algo, probablemente es un bot.
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
        return 'Invalid request';
    }

    if (!['email', 'whatsapp'].includes(contactMethod)) {
        return 'Invalid contact method';
    }

    if (
        typeof name !== 'string' ||
        !name.trim() ||
        name.trim().length > MAX_NAME_LENGTH
    ) {
        return 'Invalid name';
    }

    if (
        typeof message !== 'string' ||
        !message.trim() ||
        message.trim().length > MAX_MESSAGE_LENGTH
    ) {
        return 'Invalid message';
    }

    if (contactMethod === 'email') {
        if (
            typeof data.email !== 'string' ||
            !data.email.trim() ||
            data.email.trim().length > MAX_EMAIL_LENGTH
        ) {
            return 'Invalid email';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email.trim())) {
            return 'Invalid email';
        }
    }

    if (contactMethod === 'whatsapp') {
        if (
            typeof data.phone !== 'string' ||
            !data.phone.trim() ||
            data.phone.trim().length > MAX_PHONE_LENGTH
        ) {
            return 'Invalid phone';
        }

        const phoneRegex = /^\+?[0-9\s().-]+$/;

        if (!phoneRegex.test(data.phone.trim())) {
            return 'Invalid phone';
        }
    }

    return null;
}

const server = http.createServer((req, res) => {

    // Health check
    if (req.method === 'GET' && req.url === '/health') {
        sendJson(res, 200, {
            status: 'ok'
        });

        return;
    }

    // Contact form
    if (req.method === 'POST' && req.url === '/contact') {

        const clientIp = getClientIp(req);

        if (isRateLimited(clientIp)) {
            sendJson(res, 429, {
                success: false,
                error: 'Too many requests'
            });

            return;
        }

        let body = '';
        let bodyTooLarge = false;

        req.on('data', chunk => {
            body += chunk;

            if (Buffer.byteLength(body, 'utf8') > MAX_BODY_SIZE) {
                bodyTooLarge = true;
                req.destroy();
            }
        });

        req.on('end', async () => {

            if (bodyTooLarge) {
                return;
            }

            try {
                const data = JSON.parse(body);

                const validationError = validateContact(data);

                if (validationError) {
                    sendJson(res, 400, {
                        success: false,
                        error: validationError
                    });

                    return;
                }

                const contact = {
                    contactMethod: data.contactMethod,
                    name: data.name.trim(),
                    message: data.message.trim()
                };

                if (data.contactMethod === 'email') {
                    contact.email = data.email.trim();
                }

                if (data.contactMethod === 'whatsapp') {
                    contact.phone = data.phone.trim();
                }

                const telegramMessage = contact.contactMethod === 'email'
                    ? [
                        '📩 NUEVO CONTACTO',
                        '',
                        `👤 ${contact.name}`,
                        `📧 ${contact.email}`,
                        '',
                        `💬 ${contact.message}`
                    ].join('\n')
                    : [
                        '📱 NUEVO CONTACTO',
                        '',
                        `👤 ${contact.name}`,
                        `📞 ${contact.phone}`,
                        '',
                        `💬 ${contact.message}`
                    ].join('\n');

                try {
                    await sendTelegramMessage(telegramMessage);

                    console.log(
                        `Contact notification sent to Telegram from ${clientIp}`
                    );

                    sendJson(res, 200, {
                        success: true
                    });

                } catch (error) {
                    console.error(
                        'Failed to send Telegram notification:',
                        error.message
                    );

                    sendJson(res, 500, {
                        success: false,
                        error: 'Unable to process contact request'
                    });
                }

            } catch {
                sendJson(res, 400, {
                    success: false,
                    error: 'Invalid JSON'
                });
            }
        });

        return;
    }

    sendJson(res, 404, {
        success: false,
        error: 'Not found'
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Contact service listening on port ${PORT}`);
});