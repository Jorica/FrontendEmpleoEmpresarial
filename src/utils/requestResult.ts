import { inject } from "@angular/core";
import { MensajesAlertaService } from "../app/Services/Genericos/mensajes-alerta.service";
import { AlertMessageModel, RequestResultModel } from "./requestResult.Model";

export class RequestResult{
    contenidoAlerta: AlertMessageModel = {severity: '', detail:''}
    constructor() {}
    private alertaService = inject(MensajesAlertaService);
    private createResponse(s: string, d: string, r: any | any[]){

        this.contenidoAlerta.severity = s;
        this.contenidoAlerta.detail = d;
        this.alertaService?.mensajeAlert.emit(this.contenidoAlerta);

        return r;

    }

    validar(obj: RequestResultModel){

        var message = obj.messages ? obj.messages[0] : '';
        if(obj.isSuccessful) return this.createResponse('success', message, obj.result )

        if(obj.isError) return this.createResponse('error', obj.errorMessage!, obj.result )
        
        return this.createResponse('warn', message, obj.result)
    }

    mostrarMensaje(severity: string, detail: string){
        this.contenidoAlerta.severity = severity;
        this.contenidoAlerta.detail = detail;
        this.alertaService?.mensajeAlert.emit(this.contenidoAlerta);
    }


}

