import { Component, computed, effect, OnDestroy, signal } from '@angular/core';
import { NavbarComponent } from './features/global/navbar/navbar.component';
import { ModeOverlayComponent } from './features/global/mode-overlay/mode-overlay.component';
import { HomeComponent } from './features/global/home/home.component';
import { ContactComponent } from './features/global/contact/contact.component';
import { FooterComponent } from './features/global/footer/footer.component';
import { ExperienceComponent } from './features/work/experience/experience.component';
import { ProjectsComponent } from './features/work/projects/projects.component';
import { SkillsComponent } from './features/work/skills/skills.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    ModeOverlayComponent,
    HomeComponent,
    ContactComponent,
    FooterComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  private static readonly MODE_LOADING_MS = 1100;
  private static readonly MODE_REVEAL_MS = 450;

  readonly currentYear = new Date().getFullYear();

  readonly isDarkMode = signal(true);
  readonly siteMode = signal<'work' | 'hobbie'>('work');
  readonly pendingMode = signal<'work' | 'hobbie' | null>(null);
  readonly modeTransitionPhase = signal<'loading' | 'revealing' | null>(null);
  readonly isTransitioningMode = computed(() => this.modeTransitionPhase() !== null);
  readonly menuMode = computed(() => this.pendingMode() ?? this.siteMode());
  readonly gridVerticalLines = this.buildAxisLines(-36, 136, 8.28);
  readonly gridHorizontalLines = this.buildAxisLines(-36, 136, 7.45);

  private modeTransitionTimeoutId: number | null = null;
  private modeRevealTimeoutId: number | null = null;
  private bodyScrollLocked = false;
  private previousBodyOverflow = '';

  private readonly scrollLockEffect = effect(() => {
    const shouldLockScroll = this.isTransitioningMode();

    if (shouldLockScroll && !this.bodyScrollLocked) {
      this.previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      this.bodyScrollLocked = true;
      return;
    }

    if (!shouldLockScroll && this.bodyScrollLocked) {
      document.body.style.overflow = this.previousBodyOverflow;
      this.bodyScrollLocked = false;
    }
  });

  toggleColorMode(): void {
    this.isDarkMode.update((current) => !current);
  }

  switchSiteMode(nextMode: 'work' | 'hobbie'): void {
    if (nextMode === this.siteMode() || this.isTransitioningMode()) {
      return;
    }

    if (this.modeTransitionTimeoutId !== null) {
      window.clearTimeout(this.modeTransitionTimeoutId);
    }

    if (this.modeRevealTimeoutId !== null) {
      window.clearTimeout(this.modeRevealTimeoutId);
    }

    this.pendingMode.set(nextMode);
    this.modeTransitionPhase.set('loading');

    this.modeTransitionTimeoutId = window.setTimeout(() => {
      const modeToApply = this.pendingMode();

      if (!modeToApply) {
        return;
      }

      this.siteMode.set(modeToApply);
      this.modeTransitionPhase.set('revealing');
      this.modeTransitionTimeoutId = null;

      this.modeRevealTimeoutId = window.setTimeout(() => {
        this.pendingMode.set(null);
        this.modeTransitionPhase.set(null);
        this.modeRevealTimeoutId = null;
      }, App.MODE_REVEAL_MS);
    }, App.MODE_LOADING_MS);
  }

  private buildAxisLines(start: number, end: number, step: number): number[] {
    const lines: number[] = [];

    for (let value = start; value <= end; value += step) {
      lines.push(Number(value.toFixed(2)));
    }

    return lines;
  }

  ngOnDestroy(): void {
    if (this.modeTransitionTimeoutId !== null) {
      window.clearTimeout(this.modeTransitionTimeoutId);
    }

    if (this.modeRevealTimeoutId !== null) {
      window.clearTimeout(this.modeRevealTimeoutId);
    }

    if (this.bodyScrollLocked) {
      document.body.style.overflow = this.previousBodyOverflow;
      this.bodyScrollLocked = false;
    }
  }
}