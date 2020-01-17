import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { TableModule } from 'primeng/table'
import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog'
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { EvaluacionService } from './services/evaluacion.service'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app.component';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    DropdownModule,
    DialogModule,
    DataViewModule,
    PanelModule,
    RadioButtonModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    Ng4LoadingSpinnerModule
  ],
  providers: [
    EvaluacionService,
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
