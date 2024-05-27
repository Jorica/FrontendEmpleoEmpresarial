import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments.dev.';
import { RequestResultModel } from '../../../utils/requestResult.Model';

@Injectable({
  providedIn: 'root'
})
export class PostuladosService {
  private http = inject(HttpClient);
  private urlApi = environment.apiUrl;
  constructor() { }

  getListaEmpleosByUsuario(idEmpleo:string){
    return this.http.get<RequestResultModel>(`${this.urlApi}AppliedJob/GetPostuladosByOferta?idEmpleo=${idEmpleo}`);
  }
}
