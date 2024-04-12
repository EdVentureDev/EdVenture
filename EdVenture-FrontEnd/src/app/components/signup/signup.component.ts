import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SignupComponent {
    hidePassword = true;
    step = 1;

    constructor(private http: HttpClient) { }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const { firstName, lastName, email, password, confirmPassword } = form.value;
            const body = { firstName, lastName, email, password, confirmPassword };
            this.http.post('http://google.com', body).subscribe(response => {
                console.log(response);
                this.step = 2; // Proceed to the next step
            }, error => {
                console.error(error);
            });
        } else {
            console.error('Form is invalid');
        }
    }
}