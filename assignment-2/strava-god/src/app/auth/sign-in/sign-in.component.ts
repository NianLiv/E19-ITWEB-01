import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean  =  false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder)
  { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
     return this.loginForm.controls;
  }

  login(): void {
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }

    console.log(this.loginForm.value);
    this.authService.login();
    this.router.navigateByUrl('/workout');
  }
}
