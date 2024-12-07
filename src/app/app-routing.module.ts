import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import {SignupComponent} from './signup/signup.component'
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path:'signup', component:SignupComponent},
  { path:'cart', component:CartComponent},
  { path:'products', component:ProductsComponent},
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'users',
  loadChildren:()=> import('./users/users.module').then(m=> m.UsersModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
