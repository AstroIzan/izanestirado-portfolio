import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mode-transition-overlay',
  templateUrl: './mode-transition-overlay.component.html',
  styleUrl: './mode-transition-overlay.component.scss'
})
export class ModeTransitionOverlayComponent {
  @Input() pendingMode: 'work' | 'hobbie' | null = null;
  @Input() transitionPhase: 'loading' | 'revealing' | null = null;
}
