import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ForgetpageComponent } from '../forgetpage/forgetpage.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ForgetpageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginVerifier = false;
  hidePassword = true;
  body = {
    "username": "",
    "password": ""
  }
  state="init"

    constructor(public http: HttpClient) { }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.body.username = form.value.email;
            this.body.password = form.value.password;
            this.http
                .post('http://localhost:3000/api/v1/user/signin', this.body)
                .subscribe((response: any) => {       
                    this.state = response.msg;
                    if(this.state == "Log In Success"){
                        this.loginVerifier = true;
                    }
                });
        } else {
            console.error('Form is invalid');
        }
    }
  
}
