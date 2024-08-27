import { UsersService } from './../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GridReadyEvent, ColDef,GridApi } from 'ag-grid-community';
import { User } from '../../type';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  rowData: User[] =[];
  public gridApi!: GridApi;
  selectedRow: User[] = [];
  constructor(private http: HttpClient,
    private usersService:UsersService,
    public dialog: MatDialog,
  ) {}
  themeClass = "ag-theme-quartz";
  
  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    { field: "id",flex: 1 ,filter: true },
    { field: "firstName",flex: 1, filter: true ,editable: true },
    { field: "age",flex: 1, filter: true  },
    { field: "email",flex: 2, filter: true  },
  ];
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.usersService.getUsers().subscribe((res:any) => {
      this.rowData = res.users;
  })
  }
  onSelectionChanged(e:any) {
    this.selectedRow = this.gridApi.getSelectedRows();
    console.log(e);

  }

  editUser(){
    const dialogRef = this.dialog.open(UserEditComponent,{
       width:'450px',
      height:'450px'
    });
    dialogRef.componentInstance.user = this.selectedRow[0];
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteUser(){
    const rowtoBedeleted = this.selectedRow;
    this.usersService.deleteUser(rowtoBedeleted[0]).subscribe((resp:User) => {
      if(resp.isDeleted){
        alert("User deleted successfully..... !!!!")
      }
    });
  }

}
