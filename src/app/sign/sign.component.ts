import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.sass']
})
export class SignComponent implements OnInit {
  constructor(private http: HttpClient) { }
  isValidFormSubmitted = false;
  validPattern = "^[a-zA-Z0-9]{8,16}$";
  userForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.minLength(5)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    phone : new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    address : new FormControl('', [Validators.required]),
    member : new FormControl('', [Validators.required, Validators.pattern("[0-9]")]),
    password : new FormControl('', [Validators.required, Validators.pattern(this.validPattern)])
  })

  signup(){
     if (this.userForm.invalid) {
        return;
     }
     this.isValidFormSubmitted = true;
    console.log(this.userForm.value)
    this.http.post('http://localhost:3000/register', this.userForm.value)
    .subscribe((result)=>{
      console.log('result',result)
    })

  }
  ngOnInit(): void {
  }

}
