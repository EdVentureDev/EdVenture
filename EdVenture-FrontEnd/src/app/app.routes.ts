import { Routes } from '@angular/router';

// Importing the Components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes = [
    { path: '', component: HomeComponent, data: { title: 'EdVenture | Home' } },
    { path: 'about', component: AboutComponent, data: { title: 'EdVenture | About' } },
    { path: 'contact', component: ContactComponent, data: { title: 'EdVenture | Contact' } }
];