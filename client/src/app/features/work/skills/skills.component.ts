import { Component } from '@angular/core';

interface SkillDomain {
  code: string;
  icon: string;
  title: string;
  summary: string;
  focus: string;
  stack: string[];
  tone: 'backend' | 'frontend' | 'data' | 'reliability';
}

@Component({
  selector: 'app-work-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  readonly domains: SkillDomain[] = [
    {
      code: '01',
      icon: 'fa-solid fa-server',
      title: 'Backend systems',
      summary: 'Services designed around clear contracts, business rules, and dependable integrations.',
      focus: 'APIs & services',
      stack: ['C#', '.NET', 'ASP.NET Core', 'REST'],
      tone: 'backend'
    },
    {
      code: '02',
      icon: 'fa-solid fa-window-maximize',
      title: 'Frontend delivery',
      summary: 'Interfaces that turn operational complexity into useful, maintainable workflows.',
      focus: 'Product UI',
      stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
      tone: 'frontend'
    },
    {
      code: '03',
      icon: 'fa-solid fa-database',
      title: 'Data & integration',
      summary: 'Relational data models, reporting paths, and migrations that keep systems connected.',
      focus: 'Data flows',
      stack: ['SQL', 'EF Core', 'Migrations', 'Reporting'],
      tone: 'data'
    },
    {
      code: '04',
      icon: 'fa-solid fa-tower-broadcast',
      title: 'Reliability',
      summary: 'Delivery pipelines and production practices built for visibility, recovery, and continuity.',
      focus: 'Operations',
      stack: ['Docker', 'CI/CD', 'Monitoring', 'On-call'],
      tone: 'reliability'
    }
  ];
}
