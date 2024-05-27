import { Component, Input, ModelSignal, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../../Moduls/prime-ng/prime-ng.module';
import { PostuladosModel } from '../../../../Models/postulados.model';
import { EmpleoService } from '../../../../Services/Empleos/empleo.service';
import { RequestResult } from '../../../../../utils/requestResult';
import { CodigosEnum } from '../../../../../utils/Enums/codigos.enum';

@Component({
  selector: 'app-vista-candidatos',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './vista-candidatos.component.html',
  styleUrl: './vista-candidatos.component.scss'
})
export class VistaCandidatosComponent {

  @Input() listaCandidatos!: PostuladosModel[]
  candidato!: PostuladosModel;
  dialogVisible: boolean = true;
  requestResult = new RequestResult();
  comentario: string | undefined;

  constructor(private empleoService: EmpleoService){}

  accion(continuar:boolean){
    this.empleoService.actualizarEstadoEmpleoUsuario({
      id: this.candidato.idEmpleoUsuario,
      descripcion: this.comentario,
      codigo: continuar ? CodigosEnum.CodigoEnProceso : CodigosEnum.CodigoFinalizado
    }).subscribe(res => {
      if(this.requestResult.validar(res)){
        this.candidato.estadoPostulacion = continuar ? 'En Proceso' : 'Finalizado';
        this.candidato.observacion = this.comentario;
      }
    });
  }

  candidatoSelect(select: PostuladosModel){
    this.candidato = select;
    this.comentario = select.observacion;
  
  }

}
