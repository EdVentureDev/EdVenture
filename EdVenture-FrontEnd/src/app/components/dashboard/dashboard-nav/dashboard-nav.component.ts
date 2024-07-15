import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // import the CookieService
import { Router } from '@angular/router'; // import the Router service
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css'
})
export class DashboardNavComponent {
  constructor(public http: HttpClient, private router: Router) { }

  logout() {
    this.http.get("http://localhost:3000/api/v1/user/logout",{withCredentials:true}).subscribe(
      () => {
        // Success: delete all cookies for domain 'localhost' and path '/'
        // Assuming you're using ngx-cookie-service
        // Example: this.cookieService.deleteAll('/', 'localhost');

        this.router.navigate(['/home']); // navigate to the login page
      },
      (error) => {
        // Error handling
        console.error('Logout failed:', error);
      }
    );
  }
}
