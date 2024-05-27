export interface InformacionEmpleoUsuarioModel{
    idEmpleoUsuario:string;
    idEstadoEmpleoUsuario:string;
    descripcionEstadoEmpleoUsuario: string;
    observacionEmpleoUsuario:string;
    codigoUsuario: string;
    codigoEstadoEmpleoUsuario: string;
    detalleEmpleo: DetalleEmpleoModel;

}

export interface DetalleEmpleoModel{
    idEmpleo:string;
    nombrePublico: string;
    tituloEmpleo: string;
    descripcionEmpleo:string;
    salarioEmpleo:string;
    idModalidadTrabajo: string;
    descripcionModalidadTrabajo: string;
    fechaRegistro:string;
}