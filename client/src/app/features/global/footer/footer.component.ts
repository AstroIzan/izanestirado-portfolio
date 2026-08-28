import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.work.scss', './footer.hobbie.scss']
})
export class FooterComponent {
  @Input() currentYear = new Date().getFullYear();
}
