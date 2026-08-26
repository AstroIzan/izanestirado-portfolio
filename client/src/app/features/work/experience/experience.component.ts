import { Component, signal } from '@angular/core';

interface GraphRow {
  id: string;
  branch: string;
  lane: 'master' | 'branch';
  split?: boolean;
  merge?: boolean;
  head?: boolean;
  role?: string;
  company?: string;
  companyUrl?: string;
  period?: string;
  summary?: string;
  bullets?: string[];
  tags?: string[];
}

@Component({
  selector: 'app-work-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  private readonly rows: GraphRow[] = [
    { id: 'head', branch: 'vueling', lane: 'branch', head: true },
    {
      id: 'vueling-operations', branch: 'vueling', lane: 'branch',
      role: 'Developer · AM Operations', company: 'Vueling Airlines', companyUrl: 'https://www.vueling.com',
      period: '2025 — Now', summary: 'The systems that keep the airline flight operation running.',
      bullets: ['Development, maintenance and evolution of the flight operations applications.', '24/7 on-call rotation to keep the operation under control.', 'Complex migrations, work alongside product and IOP reviews.'],
      tags: ['C#', '.NET', 'Angular', 'SQL', 'On-call']
    },
    {
      id: 'vueling-corporate', branch: 'vueling', lane: 'branch',
      role: 'Developer · AM Corporate', company: 'Vueling Airlines', companyUrl: 'https://www.vueling.com',
      period: '2024', summary: 'Applications built around the employee experience.',
      bullets: ['Development, support and maintenance of the corporate employee apps.', 'Flows for employee requests, needs and benefits.'],
      tags: ['C#', '.NET', 'Angular', 'SQL']
    },
    { id: 'merge-vueling', branch: 'vueling', lane: 'master', merge: true },
    {
      id: 'compettia', branch: 'compettia', lane: 'branch', split: true,
      role: 'Software Developer Trainee', company: 'Compettia', companyUrl: 'https://www.compettia.com',
      period: '2022 — 2023', summary: 'First professional branch written entirely in code.',
      bullets: ['Development in C# with .NET and ASP.NET MVC, plus HTML front-end work.', 'Business data exports to Excel for corporate reporting.', 'Xamarin and MAUI migration of the mobile apps, plus environment maintenance.'],
      tags: ['C#', '.NET', 'ASP.NET MVC', 'Xamarin']
    },
    { id: 'merge-compettia', branch: 'compettia', lane: 'master', merge: true },
    {
      id: 'polinya', branch: 'polinya', lane: 'branch', split: true,
      role: 'Computer Technician', company: 'INS Polinyà', companyUrl: 'https://agora.xtec.cat/iespolinya/',
      period: '2020 — 2021', summary: 'Keeping the IT system of an entire high school alive and growing.',
      bullets: ['Maintenance and improvement of the whole IT system of the institute.', 'Deployment of new equipment and upgrades over the existing setup.', 'Day-to-day support for classroom and staff devices.'],
      tags: ['Hardware', 'Networking', 'Support']
    },
    { id: 'merge-polinya', branch: 'polinya', lane: 'master', merge: true },
    { id: 'init', branch: 'master', lane: 'master' }
  ];

  readonly graph = this.rows.map((row, index) => ({
    row,
    masterTop: index > 0,
    masterBottom: index < this.rows.length - 1,
    masterNode: row.lane === 'master',
    branchTop: !!row.merge || (row.lane === 'branch' && !row.split),
    branchBottom: row.lane === 'branch' && !row.head,
    branchNode: row.lane === 'branch',
    corner: row.split ? 'out' : row.merge ? 'in' : null,
    openEnd: !!row.head
  }));

  private readonly openId = signal<string | null>(null);

  isOpen(id: string): boolean {
    return this.openId() === id;
  }

  toggle(id: string): void {
    this.openId.update(current => (current === id ? null : id));
  }
}
