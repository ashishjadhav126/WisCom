import { UsersService } from './../services/users.service';

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { User } from '../type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {


  registrationForm!: FormGroup;
  fieldTextType: boolean = false;
  repeatFieldTextType: boolean= false;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    this.initRegForm();
  }

  initRegForm() {
    this.registrationForm = this.fb.group({
      firstName: [
        '',
        { validators: this.requiredValidator(), updateOn: 'blur' },
      ],
      lastName:  [
        '',
        { validators: this.requiredValidator(), updateOn: 'blur' },
      ],
      age:  [
        '',
        { validators: this.requiredValidator(), updateOn: 'blur' },
      ],
  });
  
  }
  
  requiredValidator() {
    return [
      Validators.required,
    ];
  }
  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const body: User = {
        firstName: this.registrationForm.controls.firstName.value,
        lastName: this.registrationForm.controls.lastName.value,
        age: this.registrationForm.controls.age.value,
      }
      this.usersService.createUser(body).subscribe({
        next: (value: User) => {
          if (value) {
            this.dialog.closeAll();
            alert("User Added successfuly")
          } else {
            console.log(value);
          }
        },
        error: (e: any) => {
          alert("Failed to add User Reason:"+ e)
          console.error(e);
        },
        complete: () => console.info('complete')
      });

  }
}
onCloseButton() {
  this.dialog.closeAll();
}

}