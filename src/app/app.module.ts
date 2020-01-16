import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { TableModule } from 'primeng/table'
import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog'

import { EvaluacionService } from './services/evaluacion.service'

import { AppComponent } from './app.component';

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
    DialogModule
  ],
  providers: [
    EvaluacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
