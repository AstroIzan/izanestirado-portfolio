import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ContactMethod = 'email' | 'whatsapp';

export interface EmailContact {
  contactMethod: 'email';
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

export interface WhatsappContact {
  contactMethod: 'whatsapp';
  name: string;
  phone: string;
  message: string;
  honeypot: string;
}

export type ContactRequest = EmailContact | WhatsappContact;

export interface ContactResponse {
  success: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly http = inject(HttpClient);

  sendContact(
    contact: ContactRequest
  ): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(
      '/api/contact',
      contact
    );
  }
}