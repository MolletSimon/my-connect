import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { ScheduleModule, RecurrenceEditorModule, AgendaService, DayService, MonthAgendaService, MonthService, WeekService, WorkWeekService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';


@NgModule({
  declarations: [AgendaComponent],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    ScheduleModule, RecurrenceEditorModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, DragAndDropService, ResizeService]
})
export class AgendaModule { }
