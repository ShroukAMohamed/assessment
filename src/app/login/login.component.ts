import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  constructor(public AuthService: AuthService) {}

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
