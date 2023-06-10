import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavLink, menuV1 } from 'src/app/shared/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  active: any;
  loginForm!: FormGroup;
  hide: boolean = false;
  eyeShow: string = 'fas fa-lock'
  alter: boolean = false;
  error = { isValid: false, token: null, exp: null };
  messageClass = '';
  message_valid: string = '';
  message = '';
  CustomerId: any;
  editData: any;
  responseData: any;
  navLinks: NavLink[] = menuV1.child;
  constructor(private router: Router, private fb: FormBuilder, private authservice: AuthService) { this.ngForm() }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   username: ['admin@demo.com', [Validators.required, Validators.email]],
    //   password: ['admindemo', Validators.required]
    // });
  }

  ngForm() {
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', Validators.required],
      password: ['admin', Validators.required]
    })
  }


  ProceedLogin() {
    this.alter = false;
    if (this.loginForm.valid) {
      this.authservice.ProceedLogin(this.loginForm.value).subscribe((s: any) => {
        this.setSideBar();
        localStorage.setItem('token', s.token);
        this.router.navigate(["/admin"]);
      });
    } else {
      this.alter = true;
      this.message_valid = 'Password or User Name is required';
    }
  }

  get volunteer() {
    return this.loginForm.get('email') as FormGroup;
  }

  setSideBar() {
    // this.navLinks.forEach(link => {
    //   // if (permission[link.title]) {
    //   //   link.display = true;
    //   // } else {
    //   //   link.display = false;
    //   // }

    //   if (permission.functionName === link.title) {
    //     link.display = true;
    //     console.log("Here");
    //   } else {
    //     link.display = false;
    //   }
    // })
    localStorage.setItem('navLinks', JSON.stringify(this.navLinks));
  }
  hidePass() {
    console.log('hidePass: ', this.hide);
    this.eyeShow = this.hide ? 'fas fa-lock' : 'fas fa-eye'
    this.hide = !this.hide
  }
}
