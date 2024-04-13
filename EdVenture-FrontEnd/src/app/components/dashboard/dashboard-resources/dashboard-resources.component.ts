import { Component } from '@angular/core';
import { DashboardNavComponent } from '../dashboard-nav/dashboard-nav.component';

@Component({
  selector: 'app-dashboard-resources',
  standalone: true,
  imports: [DashboardNavComponent],
  templateUrl: './dashboard-resources.component.html',
  styleUrl: './dashboard-resources.component.css'
})
export class DashboardResourcesComponent {

}
