const TELEGRAM_API = 'https://api.telegram.org';

async function sendTelegramMessage(message) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        throw new Error('Telegram configuration is missing');
    }

    const response = await fetch(
        `${TELEGRAM_API}/bot${token}/sendMessage`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
        throw new Error(
            `Telegram API error: ${result.description || response.statusText}`
        );
    }

    return result;
}

module.exports = {
    sendTelegramMessage
};