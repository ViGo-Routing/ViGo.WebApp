import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  createUserForm!: FormGroup;


  constructor(

    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserService,
    private fb: FormBuilder,

  ) { this.myForm(); }
  ngOnInit(): void {
    this.createUserForm.patchValue(this.data);
  }
  myForm() {
    this.createUserForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      gender: [''],
      dateOfBirth: ['', Validators.required],
      avatarUrl: ['']
    })
  }

  getListGroup() {
    // this.service.getListGroups().subscribe((s) => {
    //   console.log(s.value.result);
    //   this.userGroups = s.value.result;
    // })
  }
  getListRole() {
    // this.serviceRole.getListRoles().subscribe((s) => {
    //   this.roleList = s.value.result;
    //   console.log("roleList: " + s);
    // })
  }

  update() {
    this.service.updateUserByID(this.data.id, this.createUserForm.value).subscribe(s => {
      console.log('Thành công')
    })
  }
  cancel() {
    this.dialogRef.close();
  }

}
