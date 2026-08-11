import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills-showcase',
  templateUrl: './skills-showcase.component.html',
  styleUrl: './skills-showcase.component.scss'
})
export class SkillsShowcaseComponent {
  @Input() siteMode: 'work' | 'hobbie' = 'work';
}