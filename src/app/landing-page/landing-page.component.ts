import { Component, Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(
    public AuthService: AuthService,
  ) {}

  logOut() {
    this.AuthService.logOut();
  }
}
