import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersDetailsComponent } from './users-list/users-details/users-details.component';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridAngular } from 'ag-grid-angular';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { UserEditComponent } from './users-list/user-edit/user-edit.component';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);




@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailsComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AgGridAngular,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UsersModule { }
