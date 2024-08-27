import { UsersService } from './../../../services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../type';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  registrationForm!: FormGroup;
  @Input() user :User = {
    firstName: '',
    lastName: '',
    age: 0,
    id:0
  }
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private usersService: UsersService,
  ) {}
  ngOnInit() {
    this.initRegForm();
  }
  initRegForm() {
    this.registrationForm = this.fb.group({
      firstName: [
        this.user.firstName,
        { validators: this.requiredValidator(), updateOn: 'blur' },
      ],
      lastName:  [
        this.user.lastName,
        { validators: this.requiredValidator(), updateOn: 'blur' },
      ],
      age:  [
        this.user.age,
        { validators: this.requiredValidator(), updateOn: 'blur' },
      ],
  });
  
  }
  requiredValidator() {
    return [
      Validators.required,
    ];
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const body: User = {
        firstName: this.registrationForm.controls.firstName.value,
        lastName: this.registrationForm.controls.lastName.value,
        age: this.registrationForm.controls.age.value,
        id:this.user.id,
      }
      this.usersService.updateUser(body).subscribe((response)=> {
        this.dialog.closeAll();
        alert("user information updated Succesfully.......!!!!")
      }
      )
      
    }
  }
  onCloseButton() {
    this.dialog.closeAll();
  }
}
