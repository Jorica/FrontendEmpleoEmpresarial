import { Component, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../Moduls/prime-ng/prime-ng.module';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { CrearEditarEmpleoComponent } from './components/crear-editar-empleo/crear-editar-empleo.component';
import { SessionStorageService } from '../../Services/Genericos/session-storage.service';
import { CodigosEnum } from '../../../utils/Enums/codigos.enum';
import { loginSessionStorageModel } from '../../Models/session-storage';
import { Router } from '@angular/router';
import { EmpleoService } from '../../Services/Empleos/empleo.service';
import { RequestResult } from '../../../utils/requestResult';
import { InformacionEmpleoComponent } from './components/informacion-empleo/informacion-empleo.component';
import { InformacionEmpleoUsuarioModel } from '../../Models/informacion-empleo.model';
import { CrearEditarEmpleoModoel } from '../../Models/crear-editar-empleo.model';


@Component({
  selector: 'app-panel-principal',
  standalone: true,
  imports: [
    PrimeNGModule,
    CrearEditarEmpleoComponent,
    InformacionEmpleoComponent
  ],
  providers:[ConfirmationService],
  templateUrl: './panel-principal.component.html',
  styleUrl: './panel-principal.component.scss'
})
export class PanelPrincipalComponent implements OnInit {

  tieredOptions: MenuItem[] = [];
  showDialogoNuevoEmpleo:boolean = false;
  dataSession:loginSessionStorageModel | undefined;
  requestResult = new RequestResult();
  listaEmpleoUsuario: InformacionEmpleoUsuarioModel[] = [];
  objEditarEmpleo: CrearEditarEmpleoModoel | undefined;
  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private empleoService: EmpleoService
  ){
    
    
  }

  ngOnInit(): void {
    this.crearSession();
  }

  crearSession(){
    this.dataSession = JSON.parse(this.sessionStorageService.getSessionStorage(CodigosEnum.CodigoLoginSessionStorage) ?? '{}');
    this.dataSession?.codigoTipoUsuario == CodigosEnum.CodigoEmpresa ? this.generarTiredEmpresa() : this.generarTiredPersona();
 
  }

  generarTiredEmpresa(){
    this.getListaEmpleos();
    this.tieredOptions = [
      {
        label: 'Nueva Oferta',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.showDialogoNuevoEmpleo = true
          this.objEditarEmpleo = undefined;
        },
      },
      {
        label: this.dataSession?.nombreCompleto,
        icon: 'pi pi-fw pi-sign-out',
        id: 'confirmPopupCerrarSesion',
        command: () => {this.cerrasSesion()}
      }
    ];
  }

  generarTiredPersona(){
    this.getListaEmpleosDisponibles();
    
    this.tieredOptions = [
      {
        label: 'Ofertas Disponibles',
        icon: 'pi pi-fw pi-globe',
        id: 'ofertasDisponibles',
        command: () => {
          this.getListaEmpleosDisponibles();
          this.modificarCssMenu(document.getElementById("ofertasDisponibles"), true);
          this.modificarCssMenu(document.getElementById("postulaciones"), false);

        },
      },
      {
        label: 'Mis Postulaciones',
        icon: 'pi pi-fw pi-briefcase',
        id: 'postulaciones',
        command: () => {
          this.getListaEmpleos();
          this.modificarCssMenu(document.getElementById("postulaciones"), true);
          this.modificarCssMenu(document.getElementById("ofertasDisponibles"), false);
        },
      },
      {
        label: this.dataSession?.nombreCompleto,
        icon: 'pi pi-fw pi-sign-out',
        id: 'confirmPopupCerrarSesion',
        command: () => {this.cerrasSesion()}
      }
    ];
    setTimeout(() => {
      this.modificarCssMenu(document.getElementById("ofertasDisponibles"), true);
    });
  }

  cerrasSesion(){
    var x = [ "",""]
    this.confirmationService.confirm({
      key: 'cerrarSesion',
      target: document.getElementById('confirmPopupCerrarSesion') || new EventTarget,
      message: '¿Está seguro de cerrar la sesión?',
      icon: 'pi pi-question-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.sessionStorageService.removeSessionStorage(CodigosEnum.CodigoLoginSessionStorage);
        this.router.navigate(['/login']);
      }
  });

  }

  getListaEmpleos(){

    if(!this.dataSession?.idUsuario){
      this.router.navigate(['/login']);
      return this.requestResult.mostrarMensaje("error", "Error al acceder a la sesión del usuario.")
    }

    this.empleoService.getListaEmpleosByUsuario(this.dataSession?.idUsuario).subscribe(res => {

      this.listaEmpleoUsuario = this.requestResult.validar(res);  
      
    });
  }

  cerrarDialogoCrearEmpleo(e:any){
    this.showDialogoNuevoEmpleo = false;
    this.getListaEmpleos();
  }

  editarOferta(e:any){
    this.showDialogoNuevoEmpleo = true;
    this.objEditarEmpleo = e;
  }

  getListaEmpleosDisponibles(){

    if(!this.dataSession?.idUsuario){
      this.router.navigate(['/login']);
      return this.requestResult.mostrarMensaje("error", "Error al acceder a la sesión del usuario.")
    }

    this.empleoService.getListaEmpleoDisponibles(this.dataSession?.idUsuario).subscribe(res => {

      this.listaEmpleoUsuario = this.requestResult.validar(res);

    });
  }

  actualizarListaEmpleo(){

    if(this.dataSession?.codigoTipoUsuario == CodigosEnum.CodigoEmpresa) this.getListaEmpleos();

    if(this.dataSession?.codigoTipoUsuario == CodigosEnum.CodigoPersona) this.getListaEmpleosDisponibles();
  }

  modificarCssMenu(element:HTMLElement | null , agregar:boolean){
    if(agregar){
      element?.classList.add("border-bottom-2", "border-blue-300","shadow-3","surface-200");
    }else{
      element?.classList.remove("border-bottom-2", "border-blue-300","shadow-3","surface-200");
    }
  }
}
