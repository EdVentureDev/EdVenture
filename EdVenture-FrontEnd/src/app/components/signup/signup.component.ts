import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupComponent {
    hidePassword = true;
    formSubmitted = false;
    passwordsMatch = true;
    step = 1;
    userData = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        educational_institute: '',
        password: '',
    };
    setotp = {
        email: '',
        otp: 0,
        method: '',
    };
    state = 'Init';

    constructor(private http: HttpClient) { }

    onSubmit(form: NgForm) {
        this.formSubmitted = true;
        if (form.value.password !== form.value.confirmPassword) {
            this.passwordsMatch = false;
            return;
        }
        if (form.valid) {
            this.userData.firstName = form.value.firstName;
            this.userData.lastName = form.value.lastName;
            this.userData.username = form.value.username;
            this.userData.password = form.value.password;
            // TODO : Go to next step only if data is entered
            this.step = 2;
        } else {
            console.error('Form is invalid');
        }
    }

    getOtp(email: string) {
        const body = { email };
        this.userData.email = email;
        this.setotp.email = email;
        this.http
            .post('https://edventure.azurewebsites.net/api/v1/user/getotp', body)
            .subscribe((response: any) => {
                this.state = response.msg;
            });
    }

    onGetOtp(form: NgForm) {
        this.formSubmitted = true;
        if (form.valid) {
            this.step = 3;
        } else {
            console.error('Error Occurred');
        }
    }

    onSubmitOtp(form: NgForm) {
        if (form.valid) {
            this.setotp.otp = parseInt(form.value.otp);
            this.setotp.method = 'signup';
            // Send a request to the server to verify the OTP
            this.http
                .post('https://edventure.azurewebsites.net/api/v1/user/verifyotp', this.setotp)
                .subscribe((response: any) => {
                    console.log(response);
                    this.state = response.msg;
                    if (this.state == 'Verification Success') this.step = 4;
                });
        } else {
            console.error('Form is invalid');
        }
    }

    onCollege(form: NgForm) {
        if (form.valid) {
            this.userData.educational_institute = form.value.college;
            this.http
                .post('https://edventure.azurewebsites.net/api/v1/user/signup', this.userData)
                .subscribe((response: any) => {
                    this.state = response.msg;
                    console.log(response)
                    if ((this.state = 'User Created Successfully')) this.step = 5;
                });
        } else {
            console.error('Form is invalid');
        }
    }
}
