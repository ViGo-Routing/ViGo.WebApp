import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserLicenseService } from 'src/app/services/user-license.service';
import { Storage, getStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-create-userlicense-license',
  templateUrl: './create-user-license.component.html',
  styleUrls: ['./create-user-license.component.scss']
})
export class CreateUserLicenseComponent {
  createUserLicenseForm!: FormGroup;
  title = "cloudsSorage";
  selectedFile: File;
  fileb: any;
  downloadURL: Observable<string>;

  constructor(

    public dialogRef: MatDialogRef<CreateUserLicenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserLicenseService,
    private fb: FormBuilder,
    private auth: Auth,
    private storage: Storage
  ) {
    this.myForm();

  }
  ngOnInit(): void {
    this.createUserLicenseForm.patchValue(this.data);
  }
  myForm() {
    this.createUserLicenseForm = this.fb.group({
      frontSideFile: ['', Validators.required],
      backSideFile: ['', Validators.required],
      licenseType: ['', Validators.required],
    })
  }
  async uploadImage(event: any) {
    console.log(this.auth)
    const storage = this.storage;
    console.log(storage)
    const file = event.target.files[0];
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
  onFileSelected(event: any) {
    // var n = Date.now();
    // const file = event.target.files[0];
    // const storage = getStorage();
    // const metadata = {
    //   contentType: 'image/jpeg'
    // };
    // const storageRef = ref(storage, 'images/' + file.name);
    // const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // uploadTask.on('state_changed',
    //   (snapshot) => {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //       case 'paused':
    //         console.log('Upload is paused');
    //         break;
    //       case 'running':
    //         console.log('Upload is running');
    //         break;
    //     }
    //   },
    //   (error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case 'storage/unauthorized':
    //         // User doesn't have permission to access the object
    //         break;
    //       case 'storage/canceled':
    //         // User canceled the upload
    //         break;

    //       // ...

    //       case 'storage/unknown':
    //         // Unknown error occurred, inspect error.serverResponse
    //         break;
    //     }
    //   },
    //   () => {
    //     // Upload completed successfully, now we can get the download URL
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log('File available at', downloadURL);
    //     });
    //   }
    // );

  }
  getListGroup() {
    // this.service.getListGroups().subscribe((s) => {
    //   console.log(s.value.result);
    //   this.userlicenseGroups = s.value.result;
    // })
  }
  getListRole() {
    // this.serviceRole.getListRoles().subscribe((s) => {
    //   this.roleList = s.value.result;
    //   console.log("roleList: " + s);
    // })
  }

  update() {
    this.service.updateUserLicenseByID(this.data.id, this.createUserLicenseForm.value).subscribe(s => {
      console.log('Thành công')
    })
  }
  cancel() {
    this.dialogRef.close();
  }

}
