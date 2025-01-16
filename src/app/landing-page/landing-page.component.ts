import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LoginComponent, Dialog, ButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  visible!: boolean;
  constructor(
    public AuthService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.AuthService.visible.subscribe(() => {
        this.visible = this.AuthService.visible.getValue();
      });
    }
  }
  logOut() {
    this.AuthService.logOut();
  }
}
