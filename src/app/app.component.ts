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
  responsables: Responsable[];
  disabledNuevo: boolean = true
  servidorResponsableId2: "";
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
      },
      () => {
        this.servidorResponsableId2 = servidorResponsableId
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

  // Confirma la inicialización de una evaluación
  confirmarIniciarEvaluacion(evaluacionId) {
    this.confirmationService.confirm({
      message: 'Desea iniciar la evaluación?',
      accept: () => {
        this.iniciarEvaluacion(evaluacionId);
      }
    });
  }

  // Inicializa una evaluación
  iniciarEvaluacion(evaluacionId) {
    this._evaluacionService.iniciarEvaluacion(evaluacionId).subscribe(
      next => {
        this.data2 = next['payload']['items']
        this.display2 = true
        this._messageService('Inició la evaluación', 'success', 'Mensaje de éxito')
        this.evaluacionId = evaluacionId
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
  }

  // Marca una respuesta
  marcarRespuesta(evaluacionRespuestaId, patronRespuesta) {
    this._evaluacionService.marcarRespuesta(evaluacionRespuestaId, patronRespuesta).subscribe(
      next => {
        console.log("Respuesta Marcada");
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
  }

  // Confirma la finalización de una evaluación
  confirmarFinalizarEvaluacion(evaluacionId) {
    this.confirmationService.confirm({
      message: 'Desea finalizar la evaluación?',
      accept: () => {
        this.finalizarEvaluacion(evaluacionId);
      }
    });
  }

  // Finaliza una evaluación
  finalizarEvaluacion(evaluacionId) {
    this._evaluacionService.finalizarEvaluacion(evaluacionId).subscribe(
      next => {
        this.display2 = false
        this._messageService('Finalizó la evaluación', 'success', 'Mensaje de éxito')
        this._listarEvaluaciones(this.servidorResponsableId2)
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
  }

  // Confirma la eliminación de una evaluación
  confirmarEliminarEvaluacion(evaluacionId) {
    this.confirmationService.confirm({
      message: 'Desea eliminar la evaluación?',
      accept: () => {
        this.eliminarEvaluacion(evaluacionId);
      }
    });
  }

  // Eliminar Evaluacion
  eliminarEvaluacion(evaluacionId) {
    this._evaluacionService.eliminarEvaluacion(evaluacionId).subscribe(
      next => {
        this._messageService('Se eliminó correctamente la evaluación ' + evaluacionId, 'success', 'Mensaje de éxito')
        this._listarEvaluaciones(this.servidorResponsableId2)
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
  }

  verEvaluacion(evaluacionId) {
    this._evaluacionService.verEvaluacion(evaluacionId).subscribe(
      next => {
        this.data2 = next['payload']['items']
        next['payload']['items'].forEach(element => {
          element['helper'] = element['respuesta'];
        });
      },
      error => {
        this._messageService(error.error.status.error.messages, 'error', 'Mensaje de error')
      }
    );
    this.display = true
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
