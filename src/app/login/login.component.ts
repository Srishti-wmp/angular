import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) { }
  isValidFormSubmitted = false;
  validPattern = "^[a-zA-Z0-9]{8,16}$";
  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern(this.validPattern)])
  })
  
  login(){
     if (this.loginForm.invalid) {
        return;
     }
     this.isValidFormSubmitted = true;
    console.log(this.loginForm.value)
    this.http.post('http://localhost:3000/login', this.loginForm.value)
    .subscribe((result)=>{
      console.log('result',result)
    })

  }

  ngOnInit(): void {
  }

}
