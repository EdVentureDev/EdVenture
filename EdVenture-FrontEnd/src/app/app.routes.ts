import { Routes } from '@angular/router';

// Importing the Components
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { title: 'EdVenture | Home', path: '', component: HomeComponent },
  { title: 'EdVenture | About', path: 'about', component: AboutComponent },
  { title: 'EdVenture | Contact', path: 'contact', component: ContactComponent }
];
