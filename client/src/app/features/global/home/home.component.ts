import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() siteMode: 'work' | 'hobbie' = 'work';
  @Input() gridVerticalLines: number[] = [];
  @Input() gridHorizontalLines: number[] = [];
}