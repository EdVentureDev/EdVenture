import { Component } from '@angular/core';
import { DashboardNavComponent } from '../dashboard-nav/dashboard-nav.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard-resources',
  standalone: true,
  imports: [DashboardNavComponent, RouterLink],
  templateUrl: './dashboard-resources.component.html',
  styleUrl: './dashboard-resources.component.css'
})
export class DashboardResourcesComponent {

}
