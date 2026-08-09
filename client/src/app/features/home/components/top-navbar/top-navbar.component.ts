import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  @Input() isDarkMode = true;
  @Input() siteMode: 'work' | 'hobbie' = 'work';
  @Input() menuMode: 'work' | 'hobbie' = 'work';
  @Input() isTransitioningMode = false;

  @Output() readonly toggleTheme = new EventEmitter<void>();
  @Output() readonly siteModeChange = new EventEmitter<'work' | 'hobbie'>();

  onToggleTheme(): void {
    this.toggleTheme.emit();
  }

  onSelectMode(mode: 'work' | 'hobbie'): void {
    this.siteModeChange.emit(mode);
  }
}
