import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ContactMethod,
  ContactService
} from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  contactMethod: ContactMethod = 'email';

  isSubmitting = false;
  submitted = false;
  errorMessage = '';

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(100)
    ]],

    email: ['', [
      Validators.email,
      Validators.maxLength(254)
    ]],

    phone: ['', [
      Validators.maxLength(30)
    ]],

    message: ['', [
      Validators.required,
      Validators.maxLength(5000)
    ]],

    honeypot: ['']
  });

  selectContactMethod(method: ContactMethod): void {
    this.contactMethod = method;

    this.submitted = false;
    this.errorMessage = '';

    const emailControl = this.contactForm.controls.email;
    const phoneControl = this.contactForm.controls.phone;

    emailControl.clearValidators();
    phoneControl.clearValidators();

    if (method === 'email') {
      emailControl.setValidators([
        Validators.required,
        Validators.email,
        Validators.maxLength(254)
      ]);
    } else {
      phoneControl.setValidators([
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^\+?[0-9\s().-]+$/)
      ]);
    }

    emailControl.updateValueAndValidity();
    phoneControl.updateValueAndValidity();
  }

  submit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.contactForm.invalid || this.isSubmitting) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const value = this.contactForm.getRawValue();

    const request = this.contactMethod === 'email'
      ? {
          contactMethod: 'email' as const,
          name: value.name.trim(),
          email: value.email.trim(),
          message: value.message.trim(),
          honeypot: value.honeypot
        }
      : {
          contactMethod: 'whatsapp' as const,
          name: value.name.trim(),
          phone: value.phone.trim(),
          message: value.message.trim(),
          honeypot: value.honeypot
        };

    this.contactService.sendContact(request).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.contactForm.reset();
        this.contactMethod = 'email';
        this.selectContactMethod('email');
        this.submitted = true;
      },

      error: (error) => {
        this.isSubmitting = false;

        if (error.status === 429) {
          this.errorMessage =
            'Has enviado demasiadas solicitudes. Inténtalo de nuevo más tarde.';
          return;
        }

        this.errorMessage =
          'No se ha podido enviar el mensaje. Inténtalo de nuevo más tarde.';
      }
    });
  }
}