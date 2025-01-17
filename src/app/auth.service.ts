import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginErrors: string = '';
  visible = new BehaviorSubject<boolean>(false);
  localStore: any;
  token: any = new BehaviorSubject(null);
  constructor(
    private fireAuth: AngularFireAuth,
    public Router: Router,
    private toastr: ToastrService,
    private auth: Auth
  ) {}

  // sign in with google
  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const userToken = JSON.stringify(result.user.refreshToken);
      const email = JSON.stringify(result.user.email);
      const userName = JSON.stringify(result.user.displayName);
      this.token.next(userToken);
      localStorage.setItem('userToken', userToken);
      localStorage.setItem('email', email);
      localStorage.setItem('username', userName);
      this.visible.next(false);
      this.Router.navigate(['home'])
      this.toastr.success('Welcome Back!', '', {
        progressBar: true,
      });
      // console.log('User Info:', result.user);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  }

  // login function
  login(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.loginErrors = '';
        this.toastr.success('Welcome Back!', '', {
          progressBar: true,
        });
        console.log(res);
        const userToken = JSON.stringify(res.user?.refreshToken);
        const email = JSON.stringify(res.user?.email);
        this.token.next(userToken);
        localStorage.setItem('userToken', userToken);
        localStorage.setItem('email', email);
        this.Router.navigate(['home'])
        this.visible.next(false);
      })
      .catch((error) => {
        this.toastr.error('Login failed.', '', {
          progressBar: true,
        });
        // Handle different types of errors
        switch (error.code) {
          case 'auth/wrong-password':
            // Handle wrong password error
            this.loginErrors = 'Invalid password';
            break;
          case 'auth/invalid-credential':
            // Handle wrong password error
            this.loginErrors = 'Wrong email or password';
            break;
          case 'auth/user-not-found':
            // Handle user not found error
            this.loginErrors = 'User not found';
            break;
          case 'auth/email-already-in-use':
            // Handle email already in use error
            this.loginErrors = 'Email already in use';
            break;
          // Add more cases as needed
          default:
            // Handle other errors
            this.loginErrors = error.message;
        }
      });
  }

  //logout function
  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('email');
    this.Router.navigate(['login'])
    this.loginErrors = '';
    if (localStorage.getItem('username') != null) {
      localStorage.removeItem('username');
    }
    this.visible.next(true);
    this.token.next(null);
    this.toastr.success('Logged out successfully.', '', {
      progressBar: true,
      extendedTimeOut: 2000,
    });
  }
}
