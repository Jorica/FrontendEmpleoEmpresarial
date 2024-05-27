import { Component } from '@angular/core';
import { PrimeNGModule } from '../../Moduls/prime-ng/prime-ng.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../Models/login.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/Usuarios/usuario.services';
import { RequestResult } from '../../../utils/requestResult';
import { SessionStorageService } from '../../Services/Genericos/session-storage.service';
import { CodigosEnum } from '../../../utils/Enums/codigos.enum';
import { decrypt, encrypt } from '../../../utils/encriptacion';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeNGModule],
  providers:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup;
  credenciales: LoginModel | undefined;
  requestResult = new RequestResult();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private sessionStorageService: SessionStorageService,
  ){

    this.formLogin = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['',Validators.required]
    });

  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.credenciales = this.formLogin.value as LoginModel;
      this.validarLogin();
    } else {
      const encrip = encrypt('Jorge', 'hola');
      console.log('encriptar ',encrip);
      console.log('desencriptar ',decrypt('U2FsdGVkX19RS891rocQtw76fzbh5GrF332jDSTyjtk=', 'hola'));
      
      this.marcarCamposComoTocados();
    }
  }

  marcarCamposComoTocados() {
    Object.values(this.formLogin.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  irCrearUsuario(){
    this.router.navigate(['/crear-usuario']);
  }

  validarLogin(){
    if(this.credenciales){
      this.usuarioService.validarLogin(this.credenciales.usuario).subscribe(res => {
        var result = this.requestResult.validar(res)
        if(result){
          
          const des = decrypt(result.codigoInterno,this.credenciales?.usuario!);
          if(des == this.credenciales?.password){
            this.sessionStorageService.setSessionStorage(CodigosEnum.CodigoLoginSessionStorage,result)
            this.router.navigate(['/panel-principal']);
          }else{
            this.requestResult.mostrarMensaje('error','Credenciales incorrectas.')
          }
        
        }
      })
    }
  }

}
