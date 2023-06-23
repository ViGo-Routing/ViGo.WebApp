
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouteService } from 'src/app/services/route.service';
import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation, Inject, } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { EditRoutineComponent } from './edit-routine/edit-routine.component';
const colors: any = {
  red: {
    primary: '#705ec8',
    secondary: '#6958be',
  },
  blue: {
    primary: '#fb1c52',
    secondary: '#f83e6b',
  },
  yellow: {
    primary: '#ffab00',
    secondary: '#f3a403',
  },
};
@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {
  routine: any;
  routeStation: any;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
  ];
  constructor(
    public dialogRef: MatDialogRef<RoutineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RouteService,
    public matdialog: MatDialog,
  ) { console.log(data); }

  getRoutineByRouteId(id: string) {

    this.service.getRouteStationByRouteId(id).subscribe((result) => {
      this.routeStation = result;
      this.service.getRoutineByRouteId(id).subscribe((result) => {
        this.routine = result.data;
        this.events = this.createCalendarEvents(this.routeStation, this.routine);
      })
    })


  }
  cancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getRoutineByRouteId(this.data)
  }


  createCalendarEvents(stations: any[], routines: any[]): CalendarEvent[] {
    console.log("routines", routines)
    console.log("stations", stations)
    const events: CalendarEvent[] = [];
    if (routines) {
      routines.forEach(routine => {
        stations.forEach((station, index) => {
          const startDateTime = moment(`${routine.routineDate} ${routine.startTime}`).toDate();
          const endDateTime = moment(`${routine.routineDate} ${routine.endTime}`).toDate();
          const event: CalendarEvent = {
            start: startDateTime,
            end: endDateTime,
            title: index === 0 ? `Trạm đi: ${station.name}` : `Trạm về: ${station.name}`,
            color: {
              primary: routine.status === 'ACTIVE' ? '#009292' : '#ad2121',
              secondary: routine.status === 'ACTIVE' ? '#00A1A11F' : '#FAE3E3',

            },
            meta: {
              name: station.name,
              address: station.address,
              status: routine.status,
              id: this.data
            }
          };
          events.push(event);
        });
      });
    }
    console.log(events)
    return events;
  }

  @ViewChild('modalContent', { static: true })

  modalContent!: TemplateRef<any>;

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;

  modalData!: any | {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();


  activeDayIsOpen: boolean = false;



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.matdialog
      .open(EditRoutineComponent, {
        disableClose: true,
        data: event,
        maxHeight: 'calc(100vh - 30vh)',
        height: 'auto',
        width: '500px',

        position: { top: '5%' },
      }).afterClosed()
      .subscribe(() => {
        this.getRoutineByRouteId(this.data)
      });

  }
  newEvent!: CalendarEvent;
  addEvent(): void {
    this.newEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      actions: this.actions,
    }
    this.events.push(this.newEvent);

    this.handleEvent('Add new event', this.newEvent);
    this.refresh.next(true);
  }

  eventDropped({
    event,
    newStart,
    newEnd,
    allDay,
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.events.indexOf(event);
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.events.splice(externalIndex, 1);
      this.events.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events = [...this.events];
  }

  externalDrop(event: CalendarEvent) {
    if (this.events.indexOf(event) === -1) {
      this.events = this.events.filter((iEvent) => iEvent !== event);
      this.events.push(event);
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
