import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-hero-section',
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.scss'
})
export class HomeHeroSectionComponent {
  @Input() siteMode: 'work' | 'hobbie' = 'work';
  @Input() gridVerticalLines: number[] = [];
  @Input() gridHorizontalLines: number[] = [];
}
