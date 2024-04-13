import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  loggedInUsername: string = '';
  messages: any[] = []; // Initialize the messages array with type any[]

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit() {
    this.loggedInUsername = this.cookieService.get('loggedInUsername');

    setInterval(() => {
      this.http.get('http://localhost:3000/getmsgs', { params: { loggedInUsername: this.loggedInUsername } }).subscribe((newMessages: Object) => {
        this.messages = newMessages as any[];
      });
    }, 1000);
  }
}
