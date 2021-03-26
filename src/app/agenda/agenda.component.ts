import { Component, OnInit } from '@angular/core';
import{ jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler'

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generateAppointments(): any
    {
        let appointments = new Array();
 
        let appointment1 = {
            id: "id1", description: "George brings projector for presentations.", location: "", subject: "Quarterly Project Review Meeting", calendar: "Room 1",
            start: new Date(2016, 10, 23, 9, 0, 0),
            end: new Date(2016, 10, 23, 16, 0, 0)
        };
        let appointment2 = {
            id: "id2", description: "",
            location: "", subject: "IT Group Mtg.", calendar: "Room 2",
            start: new Date(2016, 10, 24, 10, 0, 0),
            end: new Date(2016, 10, 24, 15, 0, 0)
        };
 
        appointments.push(appointment1);
        appointments.push(appointment2);
 
        return appointments;
    }
 
    source: any =
    {
        dataType: "array",
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'calendar', type: 'string' },
            { name: 'start', type: 'date' },
            { name: 'end', type: 'date' }
        ],
        id: 'id',
        localData: this.generateAppointments()
    }
 
    dataAdapter: any = new jqx.dataAdapter(this.source);
    date: any = new jqx.date(2016, 11, 23);
 
    appointmentDataFields: any =
    {
        from: "start",
        to: "end",
        id: "id",
        description: "description",
        location: "location",
        subject: "subject",
        resourceId: "calendar"
    };
 
    resources: any =
    {
        colorScheme: "scheme05",
        dataField: "calendar",
        source: new jqx.dataAdapter(this.source)
    };
 
    views: string[] =
    [
        'weekView',
        'monthView'
    ]; 

}
