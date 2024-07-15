import { Component, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,HttpClientModule, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.checkCookie();
  }

  checkCookie(): void {
    this.http.post("http://edventure.azurewebsites.net/api/v1/user/checkCookie", {}, {withCredentials: true}).subscribe(
      (response: any) => {
        if(response.msg == "Log in Success")
          this.router.navigate(['/dashboard'])
      },
      (error: any) => {
        // Handle error here
        console.log("NO COOKIE FOUND");
      }
    );
  }
}