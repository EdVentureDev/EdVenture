import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@Component({
  selector: 'app-forgetpage',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ForgetpageComponent],
  templateUrl: './forgetpage.component.html',
  styleUrl: './forgetpage.component.css'
})

export class ForgetpageComponent {

  hidePassword = true;
  step = 1;

  constructor(public http: HttpClient) { }

  getOtp(email: string) {
    // Send a request to the server to generate and send an OTP to the email
  }

  onGetOtp(form: NgForm) {
    if (form.valid) {
        const { email, otp } = form.value;
        this.step = 2;
        // Send a request to the server to verify the OTP
    } else {
        console.error('Form is invalid');
    }
  }

  onSubmitOtp(form: NgForm) {
    if (form.valid) {
        const { email, otp } = form.value;
        // Send a request to the server to verify the OTP
        this.step = 3;
    } else {
        console.error('Form is invalid');
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
        const { firstName, lastName, email, password, confirmPassword } = form.value;
        const body = { firstName, lastName, email, password, confirmPassword };
        this.http.post('http://google.com', body).subscribe(response => {
            console.log(response);
            this.step = 3; // Proceed to the next step
        }, error => {
            console.error(error);
        });
    } else {
        console.error('Form is invalid');
    }
  }
}