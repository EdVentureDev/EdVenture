import { Routes } from '@angular/router';

// Import components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { title: 'EdVenture | Home', path: '', redirectTo: 'home', pathMatch: 'full'},
  { title: 'EdVenture | Home', path: 'home', component: HomeComponent },
  { title: 'EdVenture | About', path: 'about', component: AboutComponent },
  { title: 'EdVenture | Contact', path: 'contact', component: ContactComponent },
  { title: 'EdVenture | Page Not Found', path: '**', component: PageNotFoundComponent },
];
