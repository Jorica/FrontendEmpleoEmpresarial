import { Component, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../Moduls/prime-ng/prime-ng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearUsuarioModel } from '../../Models/crear-usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/Usuarios/usuario.services';
import { RequestResult } from '../../../utils/requestResult';
import { GenericModel } from '../../Models/generic.model';
import { MensajesAlertaService } from '../../Services/Genericos/mensajes-alerta.service';
import { DiccionarioAlertasEnum } from '../../../utils/Enums/mensajes.enum';
import { encrypt } from '../../../utils/encriptacion';


@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [PrimeNGModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent implements OnInit {
  formUsuario: FormGroup;
  dataUsuario: CrearUsuarioModel | undefined;
  requestResult = new RequestResult();
  listTipoUsuario: GenericModel[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private mensajesAlertaService: MensajesAlertaService
  ){
    this.formUsuario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['',Validators.required],
      correo: ['',Validators.required],
      telefono: ['',Validators.required],
      nombreUsuario: ['',Validators.required],
      idTipoUsuario: ['',Validators.required],
      password: ['',Validators.required],
      confirmarPassword: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTipoUsuario();
  }

  getTipoUsuario(){

    this.usuarioService.getTiposUsuario().subscribe(Response => {

      var res = this.requestResult.validar(Response);
      
      this.listTipoUsuario = res?.map((x:any) => {
        return {
          id: x.idTipoUsuario,
          descripcion: x.nombre
        }
      })
      
     });
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      this.dataUsuario = this.formUsuario.value as CrearUsuarioModel;
      this.crearUsuario();
    } else {
      this.marcarCamposComoTocados();
      this.mensajesAlertaService.mensajeAlert.emit({severity: 'warn', detail:DiccionarioAlertasEnum.FormularioIncompleto})
    }
  }

  marcarCamposComoTocados() {
    Object.values(this.formUsuario.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  crearUsuario(){

    if(this.dataUsuario?.password != this.dataUsuario?.confirmarPassword){
      return this.mensajesAlertaService.mensajeAlert.emit({severity: 'warn', detail:'Las contraseñas no coinciden'})
    }

    if(this.dataUsuario){
      this.dataUsuario.password = encrypt(this.dataUsuario.password,this.dataUsuario.nombreUsuario);
      this.dataUsuario.confirmarPassword = this.dataUsuario.password;
      this.usuarioService.crearUsuario(this.dataUsuario).subscribe(res => {
        if( this.requestResult.validar(res)) this.formUsuario.reset();
       
      })
    }
    
  }

  iraIngresar(){
    this.router.navigate(['/login']);
    
  }
}

