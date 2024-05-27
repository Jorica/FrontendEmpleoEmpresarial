import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MensajesAlertaService } from './Services/Genericos/mensajes-alerta.service';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AlertMessageModel } from '../utils/requestResult.Model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxUiLoaderModule,ToastModule],
  providers:[MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy{
  private subAlerta$: Subscription | undefined;
  constructor(
    private messageService:MessageService,
    private mensajesAlertaService:MensajesAlertaService
    
  )
  {
    this.subscripcionAlerta();
  }


  subscripcionAlerta(){
    this.subAlerta$ = this.mensajesAlertaService.mensajeAlert.subscribe((r:AlertMessageModel) => {
      if(r.detail.length > 0) this.messageService.add({severity:r.severity, detail:r.detail});
    });
  }

  ngOnDestroy(): void {
    this.subAlerta$?.unsubscribe();
  }
}
