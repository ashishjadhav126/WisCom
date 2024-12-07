import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss'
})
export class TopNavigationComponent {
  constructor(
   
    private router: Router,
    public dialog: MatDialog,
  ){

  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  navigateToSignup() {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(SignupComponent,{
      width:'450px',
      height:'400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  navigateToCart() {
    const dialogRef = this.dialog.open(CartComponent);
    // this.router.navigate(['cart']);
  }
  navigateToProduct() {
    this.router.navigate(['products']);
  }
  navigateToUsers(){
    this.router.navigate(['users/user-list']);
  }
  navigateLogin() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
