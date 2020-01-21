import { Component } from '@angular/core'
import { EvaluacionService } from './services/evaluacion.service'
import { EvaluacionesData } from './models/evaluaciones'
import { PreguntasData } from './models/preguntas'
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'

interface Responsable {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  data: EvaluacionesData[]
  EvaluacionesData: EvaluacionesData[]
  data2: PreguntasData[]
  PreguntasData: PreguntasData[]
  servidorResponsableId2: EvaluacionesData[]
  responsables: Responsable[];
  disabledNuevo: boolean = true
  evaluacionId: string = ""

  constructor(private _evaluacionService: EvaluacionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
    this.responsables = [
      { name: 'WILBER APCHO MONTES', code: '101' },
      { name: 'JOSE ANTONIO HUALLANCA AYALA', code: '102' },
      { name: 'MERLY EDITH ROSILLO LLACSAHUANGA', code: '103' }
    ];
  }

  // Obtiene las evaluaciones asignadas a un responsable
  listarEvaluaciones(event) {
    if (event.value == null) {
      this.disabledNuevo = true
      this.data = null
    }
    else {
      this.disabledNuevo = false
      this._listarEvaluaciones(event.value.code)
    }
  }

  // Obtiene las evaluaciones asignadas a un responsable
  _listarEvaluaciones(servidorResponsableId) {
    this._evaluacionService.listarEvaluaciones(servidorResponsableId).subscribe(
      next => {
        this.data = next['payload']['items']
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
      ,
      () => {
        this.servidorResponsableId2 = servidorResponsableId
      }
    );
  }

  // Obtiene las evaluaciones asignadas a un responsable
  _listarEvaluaciones2() {
    this._evaluacionService.listarEvaluaciones(this.servidorResponsableId2).subscribe(
      next => {
        this.data = next['payload']['items']
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
  }

  // Confirma la creación de una evaluación
  confirmarCrearEvaluacion() {
    this.confirmationService.confirm({
      accept: () => {
        this.crearEvaluacion();
      },
      message: 'Desea crear la evaluación?'
    });
  }

  // Crea una evaluación
  crearEvaluacion() {
    this._evaluacionService.crearEvaluacion(this.servidorResponsableId2).subscribe(
      next => {
        this._ng4LoadingSpinnerService.show();
        setTimeout(() => {
          this._messageService('Evaluación ' + next['payload']['evaluacionId'] + ' creada correctamente', 'success', 'Mensaje de éxito')
          this._listarEvaluaciones(this.servidorResponsableId2)
        }, 3000);
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
  }
  
  _messageService(detail, severity, summary) {
    this.messageService.add(
      {
        detail: detail,
        severity: severity,
        summary: summary
      })
  }

}
