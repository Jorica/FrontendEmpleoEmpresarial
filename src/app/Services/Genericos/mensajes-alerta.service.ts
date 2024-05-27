import { EventEmitter, Injectable, Output } from '@angular/core';
import { AlertMessageModel } from '../../../utils/requestResult.Model';

@Injectable({
  providedIn: 'root'
})
export class MensajesAlertaService {
  @Output() mensajeAlert:EventEmitter<AlertMessageModel> = new EventEmitter();
  constructor() {}
}
