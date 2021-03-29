import { AppointmentService } from './../services/appointment.service';
import { GroupService } from './../services/group.service';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Group } from '../model/group';
import { Appointment } from '../model/appointment';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
    public progress = 0;
    public loading = false;
    public groups: Group[];
    public appointments: Appointment[];
    public groupsDisplayed: [{text: string, value: string}] = [] as any;
    public setView: View = 'Month';
    public setDate: Date = new Date();
    public eventObject: EventSettingsModel;

    constructor(
        private _groupService: GroupService,
        private _appointmentService: AppointmentService,
        private _toastr: ToastrService
    ) { }

    // --------------------- BUILD --------------------- //
    ngOnInit(): void {
        this.getGroups();
        this.getAppointments();
    }

    getGroups() {
        this._groupService.getGroups()
            .subscribe(groups => {
                this.groups = groups;
                this.groups.forEach(group => {
                    this.groupsDisplayed.push({
                        text: group.name,
                        value: group._id
                    });
                    this.progress += 50;
                })
            })
    }

    getAppointments() {
        this._appointmentService.getAppointments()
            .subscribe(app => {
                this.eventObject = {
                    dataSource: app
                };
                this.progress += 50;
            },
            err => {
                console.error(err)
            })
    }

    // --------------------- EVENTS --------------------- //
    actionComplete(event: ActionEventArgs) {
        console.log(event);
        if(event.requestType === "eventCreated") {
            this.addAppointment(event);
        }

        if(event.requestType === "eventRemoved") {
            this.deleteAppointment(event);
        }

        if(event.requestType === "eventChanged") {

        }
    }

    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            // Create required custom elements in initial time
            if (!args.element.querySelector('.custom-field-row')) {
                let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
                let formElement: HTMLElement = args.element.querySelector('.e-schedule-form');
                formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
                let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
                let inputEle: HTMLInputElement = createElement('input', {
                    className: 'e-field', attrs: { name: 'Groupe concerné' }
                }) as HTMLInputElement;
                container.appendChild(inputEle);
                row.appendChild(container);
                let dropDownList: DropDownList = new DropDownList({
                    dataSource: this.groupsDisplayed,
                    fields: { text: 'text', value: 'value' },
                    value: (<{ [key: string]: Object }>(args.data)).EventType as string,
                    floatLabelType: 'Always', placeholder: 'Groupe concerné'
                });
                dropDownList.appendTo(inputEle);
                inputEle.setAttribute('name', 'group');
            }
        }
    }

    // --------------------- SERVICES --------------------- //
    addAppointment(event: ActionEventArgs) {
        this.loading = true;
        this._appointmentService.addAppointments(event.addedRecords[0] as unknown as Appointment)
            .subscribe(app => {
                this._toastr.success("L'évènement a bien été ajouté ! ");
                this.loading = false;
            },
            err => console.error(err));
    }

    deleteAppointment(event: ActionEventArgs) {
        let app = event.deletedRecords[0] as unknown as Appointment
        this._appointmentService.deleteAppointments(app._id)
            .subscribe(app => {
                this._toastr.success("L'évènement a bien été supprimé ! ");
                this.getAppointments();
            },
            err => console.error(err));
    }
}
