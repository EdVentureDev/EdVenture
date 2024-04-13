import { Routes } from '@angular/router';


// Import components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetpageComponent } from './components/forgetpage/forgetpage.component';
import { DashboardCommunityComponent } from './components/dashboard/dashboard-community/dashboard-community.component';


export const routes: Routes = [
  { title: 'EdVenture | Home', path: '', redirectTo: 'home', pathMatch: 'full'},
  { title: 'EdVenture | Home', path: 'home', component: HomeComponent },
  { title: 'EdVenture | About', path: 'about', component: AboutComponent },
  { title: 'EdVenture | Contact', path: 'contact', component: ContactComponent },
  { title: 'EdVenture | Signup', path: 'signup', component: SignupComponent },
  { title: 'EdVenture | Login', path: 'login', component: LoginComponent},
  { title: 'EdVenture | Forget Password', path: 'forgetpage', component: ForgetpageComponent},
  { title: 'EdVenture | Dashboard', path: 'dashboard', component: DashboardCommunityComponent},
  

  { title: 'EdVenture | Page Not Found', path: '**', component: PageNotFoundComponent },

];
