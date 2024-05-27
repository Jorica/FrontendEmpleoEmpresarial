import { Routes } from '@angular/router';
import { panelprincipalGuard } from './Guards/panelprincipal.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => 
            import("./Pages/login/login.component").then((c) => c.LoginComponent)
    },
    {
        path:'crear-usuario',
        loadComponent: () =>
            import("./Pages/crear-usuario/crear-usuario.component").then((c) => c.CrearUsuarioComponent)
    },
    {
        path:'panel-principal',
        loadComponent: () => 
            import("./Pages/panel-principal/panel-principal.component").then((c) => c.PanelPrincipalComponent),
        canActivate: [panelprincipalGuard]
    },
    {
        path:'', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path:'**', 
        loadComponent: () => 
            import("./Pages/not-found/not-found.component").then((c) => c.NotFoundComponent) 
    }
];
