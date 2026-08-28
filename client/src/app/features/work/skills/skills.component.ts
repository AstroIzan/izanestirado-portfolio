import { Component } from '@angular/core';

interface SkillDomain {
  code: string;
  icon: string;
  title: string;
  summary: string;
  focus: string;
  stack: string[];
  tone: 'backend' | 'frontend' | 'data' | 'monitoring' | 'reliability';
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
      summary: 'Comfortable owning a service end to end: business logic, internal APIs and integrations between systems that already exist and cannot break.',
      focus: 'Services & APIs',
      stack: ['C#', '.NET', 'ASP.NET MVC', 'Node.js', 'REST APIs'],
      tone: 'backend'
    },
    {
      code: '02',
      icon: 'fa-solid fa-window-maximize',
      title: 'Frontend delivery',
      summary: 'Used to building the screens people actually work on all day: dense tables, request flows, real states and responsive layouts that hold up.',
      focus: 'Interfaces that get used',
      stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Responsive UI'],
      tone: 'frontend'
    },
    {
      code: '03',
      icon: 'fa-solid fa-database',
      title: 'Data & integration',
      summary: 'At ease reading someone else\'s schema, writing the query that explains a problem, and moving data between systems or into reports without losing it.',
      focus: 'Queries & migrations',
      stack: ['SQL', 'PostgreSQL', 'Prisma', 'Data migrations', 'Reporting'],
      tone: 'data'
    },
    {
      code: '04',
      icon: 'fa-solid fa-chart-line',
      title: 'Monitoring & observability',
      summary: 'Daily work with monitoring tooling to watch, diagnose and stabilise the applications I look after: dashboards, log digging and alerts that catch things before users do.',
      focus: 'Dashboards & alerting',
      stack: ['Grafana', 'Elastic', 'Kibana', 'CheckMK', 'Log analysis'],
      tone: 'monitoring'
    },
    {
      code: '05',
      icon: 'fa-solid fa-tower-broadcast',
      title: 'Reliability',
      summary: 'Used to production being my responsibility: on-call rotations, incident triage under pressure and calm, traceable fixes instead of guesswork.',
      focus: 'Production ownership',
      stack: ['On-call', 'Incident triage', 'Docker', 'Nginx', 'Root cause analysis'],
      tone: 'reliability'
    }
  ];
}
