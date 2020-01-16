import { Component } from '@angular/core'
import { EvaluacionService } from './services/evaluacion.service'
import { EvaluacionesData } from './models/evaluaciones'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private _evaluacionService: EvaluacionService) { }

  display: boolean = false
  selectedResponsible: string = ""
  EvaluacionesData: EvaluacionesData []
  data: EvaluacionesData []
  variableId: string = 
  
  onSelectType() {
    this._evaluacionService.getEvaluaciones(this.selectedResponsible).subscribe(res => 
      {  
        this.data = res['payload']['items']
        this.selectedResponsible = this.data['servidorResponsableId']
      });
    console.log(this.data)
  }

  openModalInfo() {
    this.display = true
  }

}
