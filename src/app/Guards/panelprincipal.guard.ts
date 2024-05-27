import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionStorageService } from '../Services/Genericos/session-storage.service';
import { CodigosEnum } from '../../utils/Enums/codigos.enum';
import { loginSessionStorageModel } from '../Models/session-storage';

export const panelprincipalGuard: CanActivateFn = (route, state) => {
  const sessionSerice = inject(SessionStorageService);
  const dataSession:loginSessionStorageModel = JSON.parse(sessionSerice.getSessionStorage(CodigosEnum.CodigoLoginSessionStorage) ?? '{}');
  return dataSession ? true : false
};
