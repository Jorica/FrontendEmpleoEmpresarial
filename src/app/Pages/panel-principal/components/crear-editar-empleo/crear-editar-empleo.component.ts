import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGModule } from '../../../../Moduls/prime-ng/prime-ng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearEditarEmpleoModoel } from '../../../../Models/crear-editar-empleo.model';
import { EmpleoService } from '../../../../Services/Empleos/empleo.service';
import { RequestResult } from '../../../../../utils/requestResult';
import { GenericModel } from '../../../../Models/generic.model';
import { DiccionarioAlertasEnum } from '../../../../../utils/Enums/mensajes.enum';
import { MensajesAlertaService } from '../../../../Services/Genericos/mensajes-alerta.service';
import { SessionStorageService } from '../../../../Services/Genericos/session-storage.service';
import { loginSessionStorageModel } from '../../../../Models/session-storage';
import { CodigosEnum } from '../../../../../utils/Enums/codigos.enum';

@Component({
  selector: 'app-crear-editar-empleo',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './crear-editar-empleo.component.html',
  styleUrl: './crear-editar-empleo.component.scss'
})
export class CrearEditarEmpleoComponent implements OnInit {
  @Input() inEditarEmpleo: CrearEditarEmpleoModoel | undefined;
  @Output() cerrarDialogoEmit = new EventEmitter<boolean>();
  formEmpleo: FormGroup;
  dataEmpleo: CrearEditarEmpleoModoel | undefined;
  requestResult = new RequestResult();
  listModalidadTrabajo: GenericModel[] | undefined;
  dataSession:loginSessionStorageModel;
  titulo:string = 'Crear Oferta';
  visible:boolean = true;
  esNuevoRegistro: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private empleoService: EmpleoService,
    private mensajesAlertaService: MensajesAlertaService,
    private sessionStorageService: SessionStorageService
  ) {

    this.dataSession = JSON.parse(this.sessionStorageService.getSessionStorage(CodigosEnum.CodigoLoginSessionStorage) ?? '{}');
  
    this.formEmpleo = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['',Validators.required],
      salario: ['',Validators.required],
      idModalidad: ['',Validators.required]
    });
  }

  ngOnInit(): void {
   this.getModalidadTrabajo();
   this.validarEditarEmpleo();
  }

  getModalidadTrabajo(){
    this.empleoService.getModalidadTrabajo().subscribe(Response => {
      var res = this.requestResult.validar(Response);
      
      this.listModalidadTrabajo = res?.map((x:any) => {
        return {
          id: x.id,
          descripcion: x.descripcion
        }
      })

    })
  }

  onSubmit() {
    if (this.formEmpleo.valid) {
      this.dataEmpleo = this.formEmpleo.value as CrearEditarEmpleoModoel;
      this.GestionarEmpleo();
    } else {
      this.marcarCamposComoTocados();
      this.mensajesAlertaService.mensajeAlert.emit({severity: 'warn', detail:DiccionarioAlertasEnum.FormularioIncompleto})
    }
  }

  marcarCamposComoTocados() {
    Object.values(this.formEmpleo.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cerrarDialogo(){
    this.cerrarDialogoEmit.emit(false);
  }

  GestionarEmpleo(){

    if(this.dataEmpleo && this.dataSession){

      this.dataEmpleo.idUsuario = this.dataSession.idUsuario;

      if(this.esNuevoRegistro){

        this.empleoService.crearEmpleo(this.dataEmpleo).subscribe(Response => {
          if(this.requestResult.validar(Response)) this.formEmpleo.reset();
        })

      }else{

        this.dataEmpleo.id = this.inEditarEmpleo?.id;
        this.empleoService.actulizarEmpleo(this.dataEmpleo).subscribe(Response => {
          if(this.requestResult.validar(Response)) this.formEmpleo.reset();
        })


      }
    
    }
  
  }

  validarEditarEmpleo(){

    if(this.inEditarEmpleo){
      this.titulo = "Editar Oferta";
      this.esNuevoRegistro = false;
      this.formEmpleo.patchValue(this.inEditarEmpleo)

     }

  }

}


