import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { BookingScheduleDetailComponent } from './booking-schedule-detail/booking-schedule-detail.component';

@Component({
  selector: 'app-booking-schedules',
  templateUrl: './booking-schedules.component.html',
  styleUrls: ['./booking-schedules.component.scss'],
})
export class BookingSchedulesComponent implements OnInit {
  colors = {
    red: {
      primary: '#eb0000',
      secondary: '#f26666',
    },
    blue: {
      primary: '#0513e3',
      secondary: '#5762f2',
    },
    yellow: {
      primary: '#ffab00',
      secondary: '#f5bc47',
    },
    green: {
      primary: '#16db00',
      secondary: '#8dfc81',
    },
    purple: {
      primary: '#8200e6',
      secondary: '#c78cf5',
    },
  };

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  startStationName: string = '';
  endStationName: string = '';

  constructor(
    public dialogRef: MatDialogRef<BookingSchedulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    public matDialog: MatDialog
  ) {
    // console.log(data);
  }
  ngOnInit(): void {
    this.events = this.createCalendarEvents(this.data.bookingDetails);
    // console.log(this.events);
    this.startStationName = this.data.bookingDetails[0].startStation.name;
    this.endStationName = this.data.bookingDetails[0].endStation.name;
  }

  createCalendarEvents(bookingDetails: any[]): CalendarEvent[] {
    let events: CalendarEvent[] = [];

    if (bookingDetails) {
      bookingDetails.forEach((bookingDetail) => {
        const startDateTime = moment(
          `${bookingDetail.date.split('T')[0]} ${bookingDetail.customerDesiredPickupTime
          }`
        ).toDate();
        const eventTitle = `${bookingDetail.startStation.name} - ${bookingDetail.endStation.name}`;
        const endDateTime = moment(startDateTime)
          .add(this.data.duration, 'minutes')
          .toDate();

        const event: CalendarEvent = {
          start: startDateTime,
          end: endDateTime,
          title: eventTitle,
          color: {
            primary: this.getCalendarColor(bookingDetail.status, 'primary'),
            secondary: this.getCalendarColor(bookingDetail.status, 'secondary'),
          },
          meta: {
            id: bookingDetail.id,
          },
        };
        events.push(event);
      });
    }
    return events;
  }

  cancel() {
    this.dialogRef.close();
  }

  getCalendarColor(status: string, type: 'primary' | 'secondary') {
    switch (status) {
      case 'PENDING_ASSIGN':
        return this.colors.yellow[type];
      case 'ASSIGNED':
        return this.colors.purple[type];
      case 'GOING_TO_PICKUP':
        return this.colors.purple[type];
      case 'ARRIVE_AT_PICKUP':
        return this.colors.purple[type];
      case 'GOING_TO_DROPOFF':
        return this.colors.purple[type];
      case 'ARRIVE_AT_DROPOFF':
        return this.colors.purple[type];
      case 'CANCELLED':
        return this.colors.red[type];
      case 'COMPLETED':
        return this.colors.green[type];
      default:
        return '#fff';
    }
  }

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;

  modalData!:
    | any
    | {
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
    this.matDialog
      .open(BookingScheduleDetailComponent, {
        disableClose: true,
        data: event,
        maxHeight: 'calc(100vh - 30vh)',
        height: 'auto',
        width: '1000px',

        position: { top: '5%' },
      })
      .afterClosed()
      .subscribe(() => {
        // this.getRoutineByRouteId(this.data);
      });
  }
  newEvent!: CalendarEvent;
  // addEvent(): void {
  //   this.newEvent = {
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     color: colors.red,
  //     draggable: true,
  //     actions: this.actions,
  //   };
  //   this.events.push(this.newEvent);

  //   this.handleEvent('Add new event', this.newEvent);
  //   this.refresh.next(true);
  // }

  // eventDropped({
  //   event,
  //   newStart,
  //   newEnd,
  //   allDay,
  // }: CalendarEventTimesChangedEvent): void {
  //   const externalIndex = this.events.indexOf(event);
  //   if (typeof allDay !== 'undefined') {
  //     event.allDay = allDay;
  //   }
  //   if (externalIndex > -1) {
  //     this.events.splice(externalIndex, 1);
  //     this.events.push(event);
  //   }
  //   event.start = newStart;
  //   if (newEnd) {
  //     event.end = newEnd;
  //   }
  //   if (this.view === 'month') {
  //     this.viewDate = newStart;
  //     this.activeDayIsOpen = true;
  //   }
  //   this.events = [...this.events];
  // }

  // externalDrop(event: CalendarEvent) {
  //   if (this.events.indexOf(event) === -1) {
  //     this.events = this.events.filter((iEvent) => iEvent !== event);
  //     this.events.push(event);
  //   }
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
