import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; // import the CookieService
import { Router } from '@angular/router'; // import the Router service

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css'
})
export class DashboardNavComponent {
  constructor(private cookieService: CookieService, private router: Router) { } // inject the Router service

  logout() {
    this.cookieService.deleteAll('/', 'localhost'); // delete all cookies for domain 'localhost' and path '/'
    this.router.navigate(['/home']); // navigate to the login page
  }
}
