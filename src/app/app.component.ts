import { Component } from '@angular/core'
import { EvaluacionService } from './services/evaluacion.service'
import { EvaluacionesData } from './models/evaluaciones'
import { PreguntasData } from './models/preguntas'
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api'
import { HttpErrorResponse } from '@angular/common/http'
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
  responsables: Responsable[];
  servidorResponsableId: Responsable;
  display: boolean = false
  display2: boolean = false
  EvaluacionesData: EvaluacionesData[]
  data: EvaluacionesData[]
  PreguntasData: PreguntasData[]
  data2: PreguntasData[]
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
    this._evaluacionService.crearEvaluacion(this.servidorResponsableId).subscribe(
      next => {
        this._ng4LoadingSpinnerService.show();
        setTimeout(() => {
          this._messageService('Evaluación ' + next['payload']['evaluacionId'] + ' creada correctamente', 'success', 'Mensaje de éxito')
          this._listarEvaluaciones(this.servidorResponsableId)
        }, 3000);
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
  }

  confirmarIniciarEvaluacion(evaluacionId) {
    this.confirmationService.confirm({
      message: 'Desea iniciar la evaluación?',
      accept: () => {
        this.iniciarEvaluacion(evaluacionId);
      }
    });
  }

  iniciarEvaluacion(evaluacionId) {
    this._evaluacionService.iniciarEvaluacion(evaluacionId).subscribe(
      res => {
        this.data2 = res['payload']['items']
        this.display2 = true
        this.messageService.add({ severity: 'success', summary: 'Mensaje de éxito', detail: 'Inició la evaluación' });
        this.evaluacionId = evaluacionId
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Mensaje de error', detail: error.error.status.error.messages });
      }
    );
  }

  marcarRespuesta(evaluacionRespuestaId, patronRespuesta) {
    this._evaluacionService.marcarRespuesta(evaluacionRespuestaId, patronRespuesta).subscribe();
  }

  confirmarFinalizarEvaluacion(evaluacionId) {
    this.confirmationService.confirm({
      message: 'Desea finalizar la evaluación?',
      accept: () => {
        this.finalizarEvaluacion(evaluacionId);
      }
    });
  }

  finalizarEvaluacion(evaluacionId) {
    this._evaluacionService.finalizarEvaluacion(evaluacionId).subscribe();
    console.log('Evaluación finalizada correctamente');
  }

  confirmarEliminarEvaluacion(evaluacionId) {
    this.confirmationService.confirm({
      message: 'Desea eliminar la evaluación?',
      accept: () => {
        this.eliminarEvaluacion(evaluacionId);
      }
    });
  }

  verEvaluacion(evaluacionId) {
    this._evaluacionService.verEvaluacion(evaluacionId).subscribe(res => {
      this.data2 = res['payload']['items']
      res['payload']['items'].forEach(element => {
        element['helper'] = element['respuesta'];
      });
    });
    this.display = true
  }

  // Eliminar Evaluacion
  eliminarEvaluacion(evaluacionId) {
    this._evaluacionService.eliminarEvaluacion(evaluacionId).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'Mensaje de éxito', detail: 'Se eliminó correctamente la evaluación ' + evaluacionId });
        this._listarEvaluaciones(this.servidorResponsableId)
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Mensaje de error', detail: error.error.status.error.messages });
      }
    );
  }

  // Obtiene las evaluaciones asignadas a un responsable
  listarEvaluaciones(event) {
    if (event.value == null) {
      this.data = null
    }
    else {
      this._listarEvaluaciones(event.value.code)
    }
  }

  // Obtiene las evaluaciones asignadas a un responsable
  _listarEvaluaciones(servidorResponsableId) {
    this._evaluacionService.listarEvaluaciones(servidorResponsableId).subscribe(data => {
      this.data = data['payload']['items']
    });
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
