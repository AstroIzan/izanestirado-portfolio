import { Component, Input } from '@angular/core';
import { ContactComponent } from '../../../contact/contact.component';

@Component({
  selector: 'app-home-contact-section',
  imports: [ContactComponent],
  templateUrl: './home-contact-section.component.html',
  styleUrl: './home-contact-section.component.scss'
})
export class HomeContactSectionComponent {
  @Input() siteMode: 'work' | 'hobbie' = 'work';
}
