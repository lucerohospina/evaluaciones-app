import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { EvaluacionesData } from '../models/evaluaciones'

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get('http://10.240.132.45:8083/evaluacion/api/v1/evaluaciones/1037')
  }

  getEvaluaciones(i): Observable<EvaluacionesData[]> {
    return this.http.get<EvaluacionesData[]>('http://10.240.132.45:8083/evaluacion/api/v1/responsables/' + i + '/evaluaciones')
  }

}
