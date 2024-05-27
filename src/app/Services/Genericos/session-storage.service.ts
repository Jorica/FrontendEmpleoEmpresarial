import { Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() { }

  setSessionStorage(clave:string, valor:Object){
    sessionStorage.setItem(clave, JSON.stringify(valor));
  }

  getSessionStorage(clave:string){
    return sessionStorage.getItem(clave);
  }

  clearSessionStorage(){
    sessionStorage.clear();
  }

  removeSessionStorage(clave:string){
    sessionStorage.removeItem(clave);
  }
}
