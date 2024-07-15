import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms'; // import the FormsModule

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] // Corrected to styleUrls
})
export class ChatComponent implements OnInit {
  loggedInUsername: string = '';
  messages: any[] = []; // Initialize the messages array with type any[]

  content: string = ''; // Add a content property to the ChatComponent class

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit() {
    if (!environment.enableHttpRequests) return; // Check if HTTP requests are enabled

    this.loggedInUsername = this.cookieService.get('loggedInUsername');

    setInterval(() => {
      this.http
        .get<{ msgs: any[] }>('http://localhost:3000/api/v1/group/getmsgs', {
          params: { loggedInUsername: this.loggedInUsername }
        })
        .subscribe({
          next: (response) => {
            this.messages = response.msgs; // Changed from response.messages to response.msgs
          },
          error: (error) => {
            console.error('Error fetching messages:', error);
          }
        });
    }, 1000);
  }

  sendMessage() {
    if (!environment.enableHttpRequests) return; // Check if HTTP requests are enabled

    const body = {
      groupName: 'Group2',
      from: this.loggedInUsername, // Use the logged-in username dynamically
      content: this.content
    }; // create the body of the request

    this.http
      .post('http://localhost:3000/api/v1/group/msgGroup', body)
      .subscribe({
        next: (response) => {
          console.log('Message sent:', response);
        },
        error: (error) => {
          console.error('Error sending message:', error);
        }
      });

    this.content = ''; // clear the input field
  }
}