import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  template:`
  <div class="flex flex-column align-items-center justify-content-center h-screen gap-8">
  <span style="font-size: 2rem;">404</span>
  <i class="pi pi-spin pi-cog" style="font-size: 6rem;color: #708090" ></i>
  <span style="font-size: 2rem;">Página no encontrada</span>
  </div>
  `
})
export class NotFoundComponent {

}
