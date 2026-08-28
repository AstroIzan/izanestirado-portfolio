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
  description: string;
  stack: string[];
  status: 'active development' | 'paused' | 'stopped' | 'cancelled' | 'deprecated' | 'finished';
  repoUrl: string;
  liveUrl?: string;
  previewUrl: string;
  previewUrls: string[];
}

@Component({
  selector: 'app-work-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly selectedPreview = signal<{ title: string; previewUrls: string[] } | null>(null);
  readonly selectedPreviewIndex = signal(0);

  readonly featuredProject = {
    title: 'ADF247',
    type: 'Full-stack operational platform',
    summary: 'A coordination platform for availability, user management, notifications, and operational automation.',
    stack: ['Angular', 'Express', 'Prisma', 'PostgreSQL'],
    repoUrl: 'https://github.com/AstroIzan/ADF247',
    liveUrl: 'https://astroizan.github.io/ADF247/',
    previewUrl: '/projects/adf247/login.png',
    previewUrls: [
      '/projects/adf247/home.png',
      '/projects/adf247/login.png',
      '/projects/adf247/panel.png',
      '/projects/adf247/tableview.png',
      '/projects/adf247/tableview2.png',
      '/projects/adf247/mobileview.png'
    ]
  };

  readonly projects: Project[] = [
    {
      code: '02',
      title: 'Personal Web Page',
      type: 'Portfolio archive',
      description: 'Personal site focused on profile, work, and a compact visual identity.',
      stack: ['HTML', 'CSS', 'Responsive layout', 'GitHub Pages'],
      status: 'deprecated',
      repoUrl: 'https://github.com/AstroIzan/PersonalWebPage',
      liveUrl: 'https://astroizan.github.io/PersonalWebPage/',
      previewUrl: '/projects/personal-web-page/preview.png',
      previewUrls: [
        '/projects/personal-web-page/preview.png',
        '/projects/personal-web-page/services.png',
        '/projects/personal-web-page/experience.png',
        '/projects/personal-web-page/about.png'
      ]
    },
    {
      code: '03',
      title: 'Buscaminas',
      type: 'Browser game',
      description: 'A study project from my training, given a playful touch of humor through its presentation.',
      stack: ['TypeScript', 'DOM API', 'Game logic', 'GitHub Pages'],
      status: 'cancelled',
      repoUrl: 'https://github.com/AstroIzan/Buscaminas',
      liveUrl: 'https://astroizan.github.io/Buscaminas/',
      previewUrl: '/projects/buscaminas/home.png',
      previewUrls: [
        '/projects/buscaminas/home.png',
        '/projects/buscaminas/exampletry.png',
        '/projects/buscaminas/finish.png'
      ]
    },
    {
      code: '04',
      title: 'Pokinator',
      type: 'Interactive web build',
      description: 'An interactive Pokémon-themed experiment built around a lightweight web interface.',
      stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      status: 'finished',
      repoUrl: 'https://github.com/AstroIzan/Pokinator',
      liveUrl: 'https://astroizan.github.io/Pokinator/',
      previewUrl: '/projects/pokinator/home.png',
      previewUrls: [
        '/projects/pokinator/home.png',
        '/projects/pokinator/fullpage.png',
        '/projects/pokinator/pokemons_onproject.png',
        '/projects/pokinator/electric_type_pokemon.png'
      ]
    },
    {
      code: '05',
      title: 'Oasis',
      type: 'Interactive game experience',
      description: 'A pixel-art game experience built around movement, atmosphere, and a playful visual world.',
      stack: ['C#', 'Unity', 'Pixel art', 'Game systems'],
      status: 'stopped',
      repoUrl: 'https://github.com/AstroIzan/PF-DigitalDreams-Oasis',
      liveUrl: 'http://oasis.izanestirado.es/',
      previewUrl: '/projects/oasis/home.png',
      previewUrls: [
        '/projects/oasis/home.png',
        '/projects/oasis/about.png',
        '/projects/oasis/game01.png',
        '/projects/oasis/game02.png',
        '/projects/oasis/game03.png'
      ]
    },
    {
      code: '06',
      title: 'Digital Dreams',
      type: 'Creative web experience',
      description: 'A visual brand site shaped around bold typography, editorial composition, and interactive presentation.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
      status: 'finished',
      repoUrl: 'https://github.com/AstroIzan/PF-DigitalDreams-Oasis',
      liveUrl: 'https://digitaldreams.izanestirado.es/',
      previewUrl: '/projects/digitaldreams/home.png',
      previewUrls: [
        '/projects/digitaldreams/home.png',
        '/projects/digitaldreams/projects.png',
        '/projects/digitaldreams/services.png',
        '/projects/digitaldreams/contact.png'
      ]
    }
  ];

  readonly featuredLinks: ProjectLink[] = [
    {
      label: 'View repository',
      url: 'https://github.com/AstroIzan/ADF247',
      icon: 'fa-brands fa-github'
    },
    {
      label: 'View on web',
      url: 'https://astroizan.github.io/ADF247/',
      icon: 'fa-solid fa-arrow-up-right-from-square'
    }
  ];

  openPreview(title: string, previewUrls: string[]): void {
    this.selectedPreviewIndex.set(0);
    this.selectedPreview.set({ title, previewUrls });
  }

  selectPreview(index: number): void {
    this.selectedPreviewIndex.set(index);
  }

  closePreview(): void {
    this.selectedPreview.set(null);
  }
}
