import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mode-overlay',
  templateUrl: './mode-overlay.component.html',
  styleUrl: './mode-overlay.component.scss'
})
export class ModeOverlayComponent {
  @Input() pendingMode: 'work' | 'hobbie' | null = null;
  @Input() transitionPhase: 'loading' | 'revealing' | null = null;
}
