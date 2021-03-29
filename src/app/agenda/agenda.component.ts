import { GroupService } from './../services/group.service';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Group } from '../model/group';
@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
    public groups: Group[];
    public groupsDisplayed: [{text: string, value: string}] = [] as any;
    public setView: View = 'Month';
    public setDate: Date = new Date();
    public eventObject: EventSettingsModel = {
        dataSource: [{
            Subject: "Test",
            StartTime: new Date(),
            EndTime: new Date(),
            IsAllDay: false,
            RecurrenceRule: "FREQ=DAILY; INTERVAL=1; COUNT=10",
            IsReadOnly: false,

        }]
    }

    constructor(
        private _groupService: GroupService
    ) { }

    ngOnInit(): void {
        this.getGroups();
    }

    getGroups() {
        this._groupService.getGroups()
            .subscribe(groups => {
                this.groups = groups;
                this.groups.forEach(group => {
                    this.groupsDisplayed.push({
                        text: group.name,
                        value: group._id
                    })
                })
            })
    }

    actionComplete(appointment) {
        console.log(appointment)
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
}
