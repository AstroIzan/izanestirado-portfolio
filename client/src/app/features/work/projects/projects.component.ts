import { Component, signal } from '@angular/core';

interface ProjectLink {
  label: string;
  url: string;
  icon: string;
}

interface Project {
  code: string;
  title: string;
  type: string;
  stack: string;
  repoUrl: string;
  liveUrl?: string;
  previewUrl: string;
}

@Component({
  selector: 'app-work-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly selectedPreview = signal<{ title: string; previewUrl: string } | null>(null);

  readonly featuredProject = {
    title: 'ADF247',
    type: 'Full-stack operational platform',
    summary: 'A coordination platform for availability, user management, notifications, and operational automation.',
    stack: ['Angular', 'Express', 'Prisma', 'PostgreSQL'],
    repoUrl: 'https://github.com/AstroIzan/ADF247',
    previewUrl: 'https://opengraph.githubassets.com/1/AstroIzan/ADF247'
  };

  readonly projects: Project[] = [
    {
      code: '02',
      title: 'Personal Web Page',
      type: 'Portfolio archive',
      stack: 'HTML / CSS',
      repoUrl: 'https://github.com/AstroIzan/PersonalWebPage',
      liveUrl: 'https://astroizan.github.io/PersonalWebPage/',
      previewUrl: 'https://opengraph.githubassets.com/1/AstroIzan/PersonalWebPage'
    },
    {
      code: '03',
      title: 'Buscaminas',
      type: 'Browser game',
      stack: 'TypeScript',
      repoUrl: 'https://github.com/AstroIzan/Buscaminas',
      liveUrl: 'https://astroizan.github.io/Buscaminas/',
      previewUrl: 'https://opengraph.githubassets.com/1/AstroIzan/Buscaminas'
    },
    {
      code: '04',
      title: 'Pokinator',
      type: 'Interactive web build',
      stack: 'HTML / CSS',
      repoUrl: 'https://github.com/AstroIzan/Pokinator',
      liveUrl: 'https://astroizan.github.io/Pokinator/',
      previewUrl: 'https://opengraph.githubassets.com/1/AstroIzan/Pokinator'
    },
    {
      code: '05',
      title: 'Elixeum',
      type: 'Web experience',
      stack: 'HTML / CSS',
      repoUrl: 'https://github.com/AstroIzan/Elixeum',
      liveUrl: 'https://astroizan.github.io/Elixeum/',
      previewUrl: 'https://opengraph.githubassets.com/1/AstroIzan/Elixeum'
    },
    {
      code: '06',
      title: 'FireBnB',
      type: 'Web project',
      stack: 'HTML / CSS',
      repoUrl: 'https://github.com/AstroIzan/FireBnB',
      liveUrl: 'https://astroizan.github.io/FireBnB/',
      previewUrl: 'https://opengraph.githubassets.com/1/AstroIzan/FireBnB'
    }
  ];

  readonly featuredLinks: ProjectLink[] = [
    {
      label: 'View repository',
      url: 'https://github.com/AstroIzan/ADF247',
      icon: 'fa-brands fa-github'
    }
  ];

  openPreview(title: string, previewUrl: string): void {
    this.selectedPreview.set({ title, previewUrl });
  }

  closePreview(): void {
    this.selectedPreview.set(null);
  }
}
