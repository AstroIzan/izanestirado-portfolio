import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.work.scss', './navbar.hobbie.scss']
})
export class NavbarComponent {
  @Input() isDarkMode = true;
  @Input() siteMode: 'work' | 'hobbie' = 'work';
  @Input() menuMode: 'work' | 'hobbie' = 'work';
  @Input() isTransitioningMode = false;

  @Output() readonly toggleTheme = new EventEmitter<void>();
  @Output() readonly siteModeChange = new EventEmitter<'work' | 'hobbie'>();

  readonly isMenuOpen = signal(false);

  onToggleTheme(): void {
    this.toggleTheme.emit();
  }

  onSelectMode(mode: 'work' | 'hobbie'): void {
    this.isMenuOpen.set(false);
    this.siteModeChange.emit(mode);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
