import { NgIf } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { isPlatformBrowser } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    Dialog
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(`^[A-Za-z0-9]{6,15}$`),
    ]),
  });
  visible!: boolean;
  constructor(public AuthService: AuthService,  @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.AuthService.visible.subscribe(() => {
        this.visible = this.AuthService.visible.getValue();
      });
    }
  }
  submitLoginForm(loginForm: FormGroup) {
    console.log(loginForm.value.email);
    // this.AuthService.saveData()
    if (loginForm.valid) {
      this.AuthService.login(loginForm.value.email, loginForm.value.password);
    }
  }
  login() {
    this.AuthService.signInWithGoogle();
  }
}
