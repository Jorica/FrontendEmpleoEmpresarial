import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGModule } from '../../../../Moduls/prime-ng/prime-ng.module';
import { InformacionEmpleoUsuarioModel } from '../../../../Models/informacion-empleo.model';
import { CodigosEnum } from '../../../../../utils/Enums/codigos.enum';
import { CurrencyPipe } from '@angular/common';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { CrearEditarEmpleoModoel } from '../../../../Models/crear-editar-empleo.model';
import { EmpleoService } from '../../../../Services/Empleos/empleo.service';
import { GenericModel } from '../../../../Models/generic.model';
import { RequestResult } from '../../../../../utils/requestResult';
import { loginSessionStorageModel } from '../../../../Models/session-storage';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../../Services/Genericos/session-storage.service';
import { VistaCandidatosComponent } from '../vista-candidatos/vista-candidatos.component';
import { PostuladosService } from '../../../../Services/Postulados/postulados.service';
import { PostuladosModel } from '../../../../Models/postulados.model';



@Component({
  selector: 'app-informacion-empleo',
  standalone: true,
  imports: [PrimeNGModule,CurrencyPipe,VistaCandidatosComponent],
  templateUrl: './informacion-empleo.component.html',
  styleUrl: './informacion-empleo.component.scss'
})
export class InformacionEmpleoComponent implements OnInit {
  @Input() dataEmpleo:InformacionEmpleoUsuarioModel | undefined;
  @Output() editarOfertaEmit = new EventEmitter<CrearEditarEmpleoModoel>();
  @Output() actulizarEmpleosEmit = new EventEmitter<boolean>();

  codigoEmpresa: string = CodigosEnum.CodigoEmpresa;
  codigoPersona:string = CodigosEnum.CodigoPersona;
  itemsBtnEmpresa: MenuItem[] | undefined;
  objEditarOferta: CrearEditarEmpleoModoel | undefined;
  requestResult = new RequestResult();
  dataSession:loginSessionStorageModel | undefined;
  showDialogCandidatos: boolean = false;
  listaCandidatos: PostuladosModel[] | undefined;

  constructor(
    private empleoService: EmpleoService,
    private confirmationService: ConfirmationService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private postuladosService: PostuladosService
  ) {
    this.dataSession = JSON.parse(this.sessionStorageService.getSessionStorage(CodigosEnum.CodigoLoginSessionStorage) ?? '{}');
  }

  ngOnInit(): void {
    this.opcionesAccionEmpresa();
  }

  opcionesAccionEmpresa(){
    this.itemsBtnEmpresa = [
      {
          label: 'Editar',
          icon: 'pi pi-fw pi-pencil',
          command: () => {this.editarOferta()}
      },
      {
          label: 'Pausar',
          icon: 'pi pi-fw pi-pause-circle',
          visible: this.dataEmpleo?.codigoEstadoEmpleoUsuario == CodigosEnum.CodigoPublicado,
          command:() => {this.actualizarEstadoEmpleoUsuario(CodigosEnum.CodigoPausado,"Pausar")}
      },
      {
        label: 'Activar',
        icon: 'pi pi-fw pi-send',
        visible: this.dataEmpleo?.codigoEstadoEmpleoUsuario == CodigosEnum.CodigoPausado,
        command:() => {this.actualizarEstadoEmpleoUsuario(CodigosEnum.CodigoPublicado,"Activar")}
    },
      {
          label: 'Eliminar',
          icon: 'pi pi-fw pi-trash',
          command:() => {this.actualizarEstadoEmpleoUsuario(CodigosEnum.CodigoEliminado,"Eliminar")}
      }
  ];
  }

  verCandidatos(){
    this.postuladosService.getListaEmpleosByUsuario(this.dataEmpleo?.detalleEmpleo.idEmpleo!).subscribe(res =>{

      this.listaCandidatos = this.requestResult.validar(res);
      if(this.listaCandidatos && this.listaCandidatos.length > 0) this.showDialogCandidatos = true;
    });
    
  }

  editarOferta(){
    
    this.objEditarOferta = {
      id: this.dataEmpleo?.detalleEmpleo.idEmpleo,
      titulo: this.dataEmpleo?.detalleEmpleo.tituloEmpleo ?? '',
      descripcion: this.dataEmpleo?.detalleEmpleo.descripcionEmpleo ?? '',
      idModalidad: this.dataEmpleo?.detalleEmpleo.idModalidadTrabajo ?? '',
      idUsuario: '',
      salario: parseInt(this.dataEmpleo?.detalleEmpleo.salarioEmpleo ?? '') ?? 0
    }

    this.editarOfertaEmit.emit(this.objEditarOferta);
  }

  actualizarEstadoEmpleoUsuario(codigoEstado:string, accion:string){
    
    this.confirmationService.confirm({
      key: this.dataEmpleo?.idEmpleoUsuario,
      target: document.getElementById(this.dataEmpleo?.idEmpleoUsuario!) || new EventTarget,
      message: `¿Está seguro de ${accion} la oferta?`,
      icon: 'pi pi-question-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        var objEnvio:GenericModel = {
          id: this.dataEmpleo?.idEmpleoUsuario,
          codigo: codigoEstado
        }
        this.empleoService.actualizarEstadoEmpleoUsuario(objEnvio).subscribe(res => {
          this.requestResult.validar(res);
          this.actulizarEmpleosEmit.emit(true);
        })
      },

    });

  }

  aplicarOferta(){
    this.confirmationService.confirm({
      key: this.dataEmpleo?.idEmpleoUsuario,
      target: document.getElementById(this.dataEmpleo?.idEmpleoUsuario!) || new EventTarget,
      message: `¿Está seguro de aplicar la oferta?`,
      icon: 'pi pi-question-circle',
      accept: () => {
        if(!this.dataSession?.idUsuario){
          this.router.navigate(['/login']);
          return this.requestResult.mostrarMensaje("error", "Error al acceder a la sesión del usuario.")
        }

        this.empleoService.aplicarOferta({
          id: this.dataEmpleo?.detalleEmpleo.idEmpleo,
          idUsuario: this.dataSession.idUsuario
        }).subscribe(res => {
          this.requestResult.validar(res);
          this.actulizarEmpleosEmit.emit(true);
        })
      },

    });
  }



}
