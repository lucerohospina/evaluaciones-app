import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { EvaluacionService } from '../../services/evaluacion.service'
import { EvaluacionesData } from '../../models/evaluaciones'
import { ConfirmationService } from 'primeng/api'
import { PreguntasData } from '../../models/preguntas'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input() data: EvaluacionesData[]
  @Input() data2: PreguntasData[]
  //@Input() servidorResponsableId
  @Input() servidorResponsableId2
  @Input() listarParam

  @Output() public listarEvaluaciones: EventEmitter<any> = new EventEmitter();

  display: boolean = false
  display2: boolean = false
  evaluacionId: string = ""
  

  constructor(private _evaluacionService: EvaluacionService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
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

  // Confirma la inicialización de una evaluación
  confirmarIniciarEvaluacion(evaluacionId) {
    this.confirmationService.confirm({
      message: 'Desea iniciar la evaluación?',
      accept: () => {
        this.iniciarEvaluacion(evaluacionId);
      }
    });
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
  
  // Eliminar Evaluacion
  eliminarEvaluacion(evaluacionId) {
    this._evaluacionService.eliminarEvaluacion(evaluacionId).subscribe(
      next => {
        this._messageService('Se eliminó correctamente la evaluación ' + evaluacionId, 'success', 'Mensaje de éxito')
        this.listarEvaluaciones.emit(this.listarParam)
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
        this.listarEvaluaciones.emit(this.listarParam)
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

  _messageService(detail, severity, summary) {
    this.messageService.add(
      {
        detail: detail,
        severity: severity,
        summary: summary
      })
  }

}
