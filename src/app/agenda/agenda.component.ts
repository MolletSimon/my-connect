import { User } from './../model/user';
import { AppointmentService } from './../services/appointment.service';
import { GroupService } from './../services/group.service';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EventSettingsModel,
  PopupOpenEventArgs,
  ActionEventArgs,
  EventRenderedArgs,
  ScheduleComponent,
} from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-schedule';
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Group } from '../model/group';
import { Appointment } from '../model/appointment';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

//import the loadCldr from ej2-base
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import * as numberingSystems from '../../../node_modules/cldr-data/supplemental/numberingSystems.json';
import * as gregorian from '../../../node_modules/cldr-data/main/fr/ca-gregorian.json';
import * as numbers from '../../../node_modules/cldr-data/main/fr/numbers.json';
import * as timeZoneNames from '../../../node_modules/cldr-data/main/fr/timeZoneNames.json';

loadCldr(
  numberingSystems['default'],
  gregorian['default'],
  numbers['default'],
  timeZoneNames['default']
);
L10n.load({
  fr: {
    schedule: {
      day: 'journée',
      week: 'semaine',
      workWeek: 'Semaine de travail',
      month: 'Mois',
      today: 'Aujourd`hui',
      noEvents: "Pas d'évènements",
      emptyContainer: "Il n'y a pas d'évènements sur cette journée",
      allDay: 'Jour entier',
      start: 'Début',
      end: 'Fin',
      more: 'Plus',
      close: 'Fermer',
      cancel: 'Annuler',
      noTitle: 'Sans titre',
      delete: 'Supprimer',
      deleteEvent: "Supprimer l'évènement",
      deleteMultipleEvent: 'Supprimer plusieurs évènements',
      selectedItems: 'Items sélectionnés',
      deleteSeries: 'Supprimer la série',
      edit: 'Modifier',
      editSeries: 'Modifier la série',
      editEvent: "Modifier l'évènement",
      createEvent: 'Créer',
      subject: 'Nom',
      addTitle: 'Ajouter un titre',
      moreDetails: 'Plus de détails',
      save: 'Sauvegarder',
      editContent: 'Voulez-vous modifier cet évènement ou toute la série ?',
      deleteRecurrenceContent:
        'Voulez-vous supprimer seulement cette évènement ou toute la série ?',
      deleteContent: 'Êtes-vous sûr de vouloir supprimer cet évènement ?',
      deleteMultipleContent:
        'Êtes-vous sûr de vouloir supprimer ces évènements ?',
      newEvent: 'Nouvel évènement',
      title: 'Titre',
      location: 'Lieu',
      description: 'Description',
      timezone: 'UTC',
      startTimezone: 'Début UTC',
      endTimezone: 'Fin UTC',
      repeat: 'Répeter',
      saveButton: 'Sauvegarder',
      cancelButton: 'Annuler',
      deleteButton: 'Supprimer',
      recurrence: 'Réccurence',
      wrongPattern: "Le réccurence pattern n'est pas valide.",
      seriesChangeAlert:
        'The changes made to specific instances of this series will be cancelled and those events will match the series again.',
      createError:
        'The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.',
      recurrenceDateValidation:
        'Some months have fewer than the selected date. For these months, the occurrence will fall on the last date of the month.',
      sameDayAlert:
        'Two occurrences of the same event cannot occur on the same day.',
      editRecurrence: 'Modifier la réccurence',
      repeats: 'Repeats',
      alert: 'Alert',
      startEndError: 'The selected end date occurs before the start date.',
      invalidDateError: 'The entered date value is invalid.',
      ok: 'Ok',
      occurrence: 'Occurrence',
      series: 'Séries',
      previous: 'Précédent',
      next: 'Suivant',
    },
    calendar: {
      today: 'Aujourd`hui',
    },
    recurrenceeditor: {
      none: 'Aucune',
      daily: 'Journalier',
      weekly: 'Hebdomadaire',
      monthly: 'Mensuel',
      month: 'Mois',
      yearly: 'Annuel',
      never: 'Jamais',
      until: "Jusqu'à",
      count: 'Nombre de jours',
      first: 'Premier',
      second: 'Second',
      third: 'Troisième',
      fourth: 'Quatrième',
      last: 'Dernier',
      repeat: 'Répéter',
      repeatEvery: 'Répéter tous les',
      on: 'Répéter au',
      end: 'Fin',
      onDay: 'Jour',
      days: 'Jours',
      weeks: 'Semaine(s)',
      months: 'Mois(s)',
      years: 'Année(s)',
      every: 'Tous les',
      summaryTimes: 'time(s)',
      summaryOn: 'on',
      summaryUntil: 'until',
      summaryRepeat: 'Repeats',
      summaryDay: 'day(s)',
      summaryWeek: 'week(s)',
      summaryMonth: 'month(s)',
      summaryYear: 'year(s)',
    },
  },
});

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public progress = 0;
  public loading = false;
  public groups: Group[];
  public appointments: Appointment[];
  public groupsDisplayed: [{ text: string; value: string }] = [] as any;
  public setView: View = 'Month';
  public setViewMobile: View = 'Agenda';
  public setDate: Date = new Date();
  public eventObject: EventSettingsModel;

  user: User;

  constructor(
    private _groupService: GroupService,
    private _appointmentService: AppointmentService,
    private _toastr: ToastrService
  ) {}

  // --------------------- BUILD --------------------- //
  ngOnInit(): void {
    this.getCurrentUser();
    this.getGroups();
    this.getAppointments();
  }

  getCurrentUser() {
    this.user = jwt_decode(sessionStorage.getItem('CurrentUser')) as User;
  }

  getGroups() {
    this._groupService.getGroups(this.user).subscribe((groups) => {
      this.groups = groups;
      this.groups.forEach((group) => {
        this.groupsDisplayed.push({
          text: group.name,
          value: group._id,
        });
        this.progress += 50;
      });
      this.groupsDisplayed.push({
        text: 'Tous',
        value: 'all',
      });
    });
  }

  getAppointments() {
    this._appointmentService.getAppointments(this.user.groups).subscribe(
      (app) => {
        this.eventObject = {
          dataSource: app,
        };
        this.progress += 50;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // --------------------- EVENTS --------------------- //
  actionComplete(event: ActionEventArgs) {
    if (event.requestType === 'eventCreated') {
      this.addAppointment(event);
    }

    if (event.requestType === 'eventRemoved') {
      this.deleteAppointment(event);
    }

    if (event.requestType === 'eventChanged') {
    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      // Create required custom elements in initial time
      if (!args.element.querySelector('.custom-field-row')) {
        let row: HTMLElement = createElement('div', {
          className: 'custom-field-row',
        });
        let formElement: HTMLElement =
          args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(
          row,
          args.element.querySelector('.e-title-location-row')
        );
        let container: HTMLElement = createElement('div', {
          className: 'custom-field-container',
        });
        let inputEle: HTMLInputElement = createElement('input', {
          className: 'e-field',
          attrs: { name: 'Groupe' },
        }) as HTMLInputElement;
        container.appendChild(inputEle);
        row.appendChild(container);
        let dropDownList: DropDownList = new DropDownList({
          dataSource: this.groupsDisplayed,
          fields: { text: 'text', value: 'value' },
          value: (<{ [key: string]: Object }>args.data).EventType as string,
          floatLabelType: 'Always',
          placeholder: 'Groupe concerné',
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'group');
      }
    }
  }

  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.Group['color'] as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor =
        categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }

    if (window.matchMedia('(max-width: 600px)').matches) {
      this.setView = 'Agenda';
    }
  }

  // --------------------- SERVICES --------------------- //
  addAppointment(event: ActionEventArgs) {
    let appointment = event.addedRecords[0];

    if (!appointment['group']) {
      if (
        confirm(
          `Attention ! Vous n'avez pas sélectionné de groupe pour cet évènement. Par défaut l'évènement sera appliqué à tous les groupes. Souhaitez-vous continuer ?`
        )
      ) {
        appointment['Group'] = this.groups[this.groups.length - 1];
      } else {
        location.reload();
        return;
      }
    }

    this.loading = true;
    appointment['Group'] = appointment['Group']
      ? appointment['Group']
      : this.groups.find((g) => g._id == appointment['group']);
    this._appointmentService
      .addAppointments(event.addedRecords[0] as unknown as Appointment)
      .subscribe(
        (app) => {
          this._toastr.success("L'évènement a bien été ajouté ! ");
          this.loading = false;
        },
        (err) => console.error(err)
      );
  }

  deleteAppointment(event: ActionEventArgs) {
    let app = event.deletedRecords[0] as unknown as Appointment;
    this._appointmentService.deleteAppointments(app._id).subscribe(
      (app) => {
        this._toastr.success("L'évènement a bien été supprimé ! ");
        this.getAppointments();
      },
      (err) => console.error(err)
    );
  }

  // CSS FUNCTION
  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
}
