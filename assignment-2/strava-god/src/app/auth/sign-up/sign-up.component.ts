import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) 
  { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup(): void {
    this.isSubmitted = true;
    if(this.signupForm.invalid){
      return;
    }

    console.log(this.signupForm.value);
    this.router.navigateByUrl('/');
  }

}
