// import { MatFormField } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
// import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule, MatIconAnchor, MatIconButton} from  '@angular/material/button';
import {MatCardModule} from  '@angular/material/card';
import {MatDialogModule} from  '@angular/material/dialog';
import {MatMenuModule} from  '@angular/material/menu';
import { MatFormField } from  '@angular/material/form-field';
import { MatProgressSpinner} from '@angular/material/progress-spinner';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component'
import { MatPseudoCheckbox } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './signup/product.reducer';
// import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SignupComponent,
    CartComponent,
    TopNavigationComponent,
    ProductsComponent,
    UsersComponent,
    CheckoutComponent,
    OrdersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatFormField,
    MatProgressSpinner,
    MatIconAnchor,
    MatPseudoCheckbox,
    StoreModule.forRoot( { products:productReducer
      
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
