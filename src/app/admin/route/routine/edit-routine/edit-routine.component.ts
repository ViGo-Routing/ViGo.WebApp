import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouteService } from 'src/app/services/route.service';
import { DateTime } from 'luxon';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.component.html',
  styleUrls: ['./edit-routine.component.scss']
})
export class EditRoutineComponent {
  updateRoutineForm: FormGroup;
  routine: any = {
    routineDate: '',
    startTime: '',
    endTime: '',
    status: '',
  };
  constructor(
    public dialogRef: MatDialogRef<EditRoutineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RouteService,
    public matdialog: MatDialog,
    private fb: FormBuilder,
  ) { console.log(data); this.myForm(); }

  ngOnInit() {
    const dateStart = new Date(this.data.start);
    const timeStart = dateStart.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const dateEnd = new Date(this.data.end);
    const timeEnd = dateEnd.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });


    console.log(timeEnd)
    this.updateRoutineForm.patchValue({
      routineDate: this.data.start,
      startTime: timeStart,
      endTime: timeEnd,
      status: this.data.meta.status,
    });
  }

  myForm() {
    this.updateRoutineForm = this.fb.group({
      routineDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['', Validators.required],
    })
  }
  update() {
    if (this.updateRoutineForm.valid) {
      console.log(this.updateRoutineForm.get('routineDate')?.value, this.updateRoutineForm.get('endTime')?.value)

      let routineDate = formatDate(this.updateRoutineForm.get('routineDate')?.value.toString(), 'yyyy-MM-dd', 'en');


      this.routine.routineDate = routineDate;
      this.routine.startTime = this.updateRoutineForm.get('startTime')?.value;
      this.routine.endTime = this.updateRoutineForm.get('endTime')?.value;
      this.routine.status = this.updateRoutineForm.get('status')?.value;

      if (this.updateRoutineForm.get('startTime')?.value.length === 5) {
        this.routine.startTime = this.updateRoutineForm.get('startTime')?.value + ':00'
      }
      if (this.updateRoutineForm.get('endTime')?.value.length === 5) {
        this.routine.endTime = this.updateRoutineForm.get('endTime')?.value + ':00'
      }
      this.service.updateRoutineByID(this.data.meta.id, this.routine).subscribe((result) => {
        console.log('Thành công')
        this.dialogRef.close();
      })
    }

  }
  cancel() {
    this.dialogRef.close();
  }
}
