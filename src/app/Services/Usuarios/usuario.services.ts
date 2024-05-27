import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments.dev.';
import { RequestResultModel } from '../../../utils/requestResult.Model';
import { CrearUsuarioModel } from '../../Models/crear-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private urlApi = environment.apiUrl;
  constructor() { }

  getTiposUsuario(){
    return this.http.get<RequestResultModel>(`${this.urlApi}User/GetTiposUsuario`);
  }

  crearUsuario(usuario: CrearUsuarioModel){
    return this.http.post<RequestResultModel>(`${this.urlApi}User/CrearUsuario`,usuario);
  }

  validarLogin(usuario:string){
    return this.http.get<RequestResultModel>(`${this.urlApi}User/ValidarLogin?usuario=${usuario}`);
  }
}
