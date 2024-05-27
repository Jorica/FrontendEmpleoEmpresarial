import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments.dev.';
import { RequestResultModel } from '../../../utils/requestResult.Model';
import { CrearEditarEmpleoModoel } from '../../Models/crear-editar-empleo.model';
import { GenericModel } from '../../Models/generic.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {
  private http = inject(HttpClient);
  private urlApi = environment.apiUrl;
  constructor() { }

  getModalidadTrabajo(){
    return this.http.get<RequestResultModel>(`${this.urlApi}Employment/ListaModalidadTrabajo`);
  }

  crearEmpleo(empleo: CrearEditarEmpleoModoel){
    return this.http.post<RequestResultModel>(`${this.urlApi}Employment/CrearEmpleo`,empleo);
  }

  getListaEmpleosByUsuario(idUsuario:string){
    return this.http.get<RequestResultModel>(`${this.urlApi}Employment/ListaEmpleosByUsuario?idUsuario=${idUsuario}`);
  }

  actulizarEmpleo(empleo: CrearEditarEmpleoModoel){
    return this.http.post<RequestResultModel>(`${this.urlApi}Employment/ActualizarEmpleo`,empleo);
  }

  actualizarEstadoEmpleoUsuario(empleo: GenericModel){
    return this.http.post<RequestResultModel>(`${this.urlApi}Employment/ActualizarEstadoEmpleoUsuario`,empleo);
  }

  getListaEmpleoDisponibles(idUsuario:string){
    return this.http.get<RequestResultModel>(`${this.urlApi}Employment/ListaEmpleosDisponibles?idUsuario=${idUsuario}`);
  }

  aplicarOferta(oferta: GenericModel){
    return this.http.post<RequestResultModel>(`${this.urlApi}Employment/AplicarOferta`,oferta);
  }
}
