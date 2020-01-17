import { Component, OnInit } from '@angular/core'
import { EvaluacionService } from './services/evaluacion.service'
import { EvaluacionesData } from './models/evaluaciones'
import { PreguntasData } from './models/preguntas'
import { ResponsablesData } from './models/responsables'
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  ResponsablesData: ResponsablesData[];
  display: boolean = false
  display2: boolean = false
  selectedResponsible: ResponsablesData
  EvaluacionesData: EvaluacionesData[]
  data: EvaluacionesData[]
  PreguntasData: PreguntasData[]
  data2: PreguntasData[]
  evaluacionId: string = ""
  constructor(private _evaluacionService: EvaluacionService, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  listarEvaluaciones(event) {
    this._evaluacionService.listarEvaluaciones(this.selectedResponsible).subscribe(res => {
      this.data = res['payload']['items']
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

  confirmarCrearEvaluacion() {
    this.confirmationService.confirm({
      message: 'Desea crear la evaluación?',
      accept: () => {
        this.crearEvaluacion();
      }
    });
  }

  crearEvaluacion() {
    this._evaluacionService.crearEvaluacion(this.selectedResponsible).subscribe(res => this.data = res['payload']['items']);
    console.log('Evaluación creada correctamente');
    this.messageService.add({severity:'success', summary: 'Mensaje de éxito', detail:'Evaluación creada correctamente'});
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
    this._evaluacionService.iniciarEvaluacion(evaluacionId).subscribe(res => {
      this.data2 = res['payload']['items']
    });
    this.display2 = true
    this.evaluacionId = evaluacionId
    console.log('Evaluación iniciada correctamente');
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

  eliminarEvaluacion(evaluacionId) {
    console.log('Evaluación eliminada correctamente');
  }

}
