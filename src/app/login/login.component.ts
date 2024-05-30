import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  buttonDisabled: boolean = true;
  fieldTextType: boolean = false;
  repeatFieldTextType: boolean= false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authenticationservice:AuthenticationService,
    public dialog: MatDialog,
    
  ) { }
  ngOnInit() {
    
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        { validators: this.usernameValidator(), updateOn: 'blur' },
      ],
      password: [
        '',
        { validators: this.passwordValidator(), updateOn: 'blur' },
      ],
      confirm: [false, { validators: this.confirmCheckValidator(), updateOn: 'blur' },
    ],
    });
    if (this.authenticationservice.isAuthenticatedUser()) {
      this.router.navigate(['products']);
    }

  }
  ngOnDestroy() {}
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  passwordValidator() {
    return [
      Validators.required,
      Validators.minLength(8),
    ];
  }
  usernameValidator() {
    return [
      Validators.required,
      // Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
      
    ];
  }
  confirmCheckValidator() {
    return [
      Validators.required,
      
      // Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'),
    ];
  }
  onCheckChange() {
    this.confirmCheckValidator()
    this.loginForm.updateValueAndValidity;
  }
  onSubmit() {
    if (this.loginForm.valid && this.loginForm.controls.confirm.value)
      {
        this.authenticationservice
        .login(this.loginForm.controls.username.value,this.loginForm.controls.password.value)
        .subscribe({
          next: (value:any) => {
            if (value === 'SUCCESS') {
              // route it to next component
              this.dialog.closeAll();
              alert("User logged In successfuly")
              this.router.navigate(['products']);
              // this.
            } else {
              console.log(value);
            }
          },
          error: (e: any) => {
            alert("failed to login Reason:"+e)
            console.error(e);
          },
          complete: () => console.info('complete')
        });
      }
   
  }
  // openDialog() {
  //   const dialogRef = this.dialog.open(LoginComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  onCloseButton() {
    this.dialog.closeAll();
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
  // navigateToCart() {
  //   this.router.navigate(['cart']);
  // }
  // navigateToProduct() {
  //   this.router.navigate(['products']);
  // }
}
