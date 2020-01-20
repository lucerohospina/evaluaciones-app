import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { EvaluacionesData } from '../models/evaluaciones'
import { PreguntasData } from '../models/preguntas'
import { HttpHeaders } from '@angular/common/http';
const headersJson = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})

export class EvaluacionService {

  //---------------- Properties---------------
  readonly rootUrl = 'http://localhost:8080/';//'http://10.240.132.45:8083/';

  constructor(private http: HttpClient) { }

  //---------------- Http Methods---------------

  verEvaluacion(evaluacionId): Observable<PreguntasData[]> {
    return this.http.get<PreguntasData[]>(this.rootUrl + 'evaluacion/api/v1/evaluaciones/' + evaluacionId)
  }

  crearEvaluacion(servidorResponsableId) {
    return this.http.post<any>(this.rootUrl + 'evaluacion/api/v1/evaluaciones', {
      "trace": {
        "traceId": servidorResponsableId
      },
      "payload": {
        "servidorResponsableId": servidorResponsableId,
        "tiempoMaximo": 120,
        "finEncuesta": "N",
        "numeroIntentos": 0,
        "rezagado": "0",
        "usuarioCreacion": "APRIETO"
      }
    }
    )
  }

  iniciarEvaluacion(evaluacionId): Observable<PreguntasData[]> {
    return this.http.put<any>(this.rootUrl + 'evaluacion/api/v1/evaluaciones/inicio', {
      "trace": {
        "traceId": evaluacionId
      },
      "payload": {
        "evaluacionId": evaluacionId,
        "usuarioModificacion": "APRIETO"
      }
    }
    )
  }

  marcarRespuesta(evaluacionRespuestaId, patronRespuesta): Observable<PreguntasData[]> {
    return this.http.put<any>(this.rootUrl + 'respuesta/api/v1/respuestas', {
      "trace": {
        "traceId": evaluacionRespuestaId
      },
      "payload": {
        "evaluacionRespuestaId": evaluacionRespuestaId,
        "patronRespuesta": patronRespuesta,
        "usuarioModificacion": "APRIETO"
      }
    }
    )
  }

  finalizarEvaluacion(evaluacionId) {
    return this.http.put<any>(this.rootUrl + 'evaluacion/api/v1/evaluaciones/fin',
      {
        "trace": {
          "traceId": evaluacionId
        },
        "payload": {
          "evaluacionId": evaluacionId,
          "usuarioModificacion": "APRIETO"
        }
      }
    )
  }

  eliminarEvaluacion(evaluacionId) {
    return this.http.request("delete", this.rootUrl + 'evaluacion/api/v1/evaluaciones',
      {
        headers: headersJson,
        body: {
          "trace": {
            "traceId": evaluacionId
          },
          "payload": {
            "evaluacionId": evaluacionId,
            "usuarioModificacion": "APRIETO"
          }
        }
      })
  }

  // Obtiene las evaluaciones asignadas a un responsable
  listarEvaluaciones(servidorResponsableId): Observable<EvaluacionesData[]> {
    return this.http.get<EvaluacionesData[]>(this.rootUrl + 'evaluacion/api/v1/responsables/' + servidorResponsableId + '/evaluaciones')
  }

}