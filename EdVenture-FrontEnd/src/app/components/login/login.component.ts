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
  hidePassword = true;

    constructor(public http: HttpClient) { }

    /*onSubmit(form: NgForm) {
        if (form.valid) {
            const {email, password } = form.value;
            const body = {email, password};
            this.http.post('http://google.com', body).subscribe(response => {
                console.log(response);
                            }, error => {
                console.error(error);
            });
        } else {
            console.error('Form is invalid');
        }
    }*/
  
}
