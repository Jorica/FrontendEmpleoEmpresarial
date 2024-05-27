export interface CrearEditarEmpleoModoel{
    id?: string;
    titulo: string;
    descripcion: string;
    salario:number
    idModalidad:string;
    idUsuario:string;
    codigoEstadoEmpleoUsuario?: string;
}