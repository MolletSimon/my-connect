import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';


@NgModule({
  declarations: [AgendaComponent],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    jqxSchedulerModule
  ]
})
export class AgendaModule { }
