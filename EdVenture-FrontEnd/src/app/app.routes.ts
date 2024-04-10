import { Routes } from '@angular/router';

// Importing the Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes = [
    { path: '', component: HomeComponent, data: { title: 'EdVenture | Home' } },
    { path: 'about', component: AboutComponent, data: { title: 'EdVenture | About' } },
    { path: 'contact', component: ContactComponent, data: { title: 'EdVenture | Contact' } }
];