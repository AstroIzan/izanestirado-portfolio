import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-feature-section',
  templateUrl: './home-feature-section.component.html',
  styleUrl: './home-feature-section.component.scss'
})
export class HomeFeatureSectionComponent {
  @Input({ required: true }) sectionId = '';
  @Input({ required: true }) indexLabel = '';
  @Input({ required: true }) title = '';
  @Input() description = '';
  @Input() isSkillsShell = false;
}
