import { Component } from '@angular/core';
import { DashboardNavComponent } from '../dashboard-nav/dashboard-nav.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard-community',
  standalone: true,
  imports: [DashboardNavComponent, RouterLink],
  templateUrl: './dashboard-community.component.html',
  styleUrl: './dashboard-community.component.css'
})
export class DashboardCommunityComponent {

}
