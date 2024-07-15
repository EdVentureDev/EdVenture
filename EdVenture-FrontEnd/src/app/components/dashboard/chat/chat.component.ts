import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms' // import the FormsModule

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  loggedInUsername: string = ''
  messages: any[] = [] // Initialize the messages array with type any[]

  constructor (private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit () {
    this.loggedInUsername = this.cookieService.get('loggedInUsername')

    setInterval(() => {
      this.http
        .get('http://localhost:3000/api/v1/group/getmsgs', {
          params: { loggedInUsername: this.loggedInUsername }
        })
        .subscribe((response: any) => {
          this.messages = response.msgs // Changed from response.messages to response.msgs
        })
    }, 1000)
  }

  content: string = '' // Add a content property to the ChatComponent class

  sendMessage () {
    const body = {
      groupName: 'Group2',
      from: 'itsUser1',
      content: this.content
    } // create the body of the request

    this.http
      .post('http://localhost:3000/api/v1/group/msgGroup', body)
      .subscribe((response: any) => {})

    this.content = '' // clear the input field
  }
}
