export interface RequestResultModel{
    isSuccessful: boolean;
    isError: boolean;
    errorMessage: string | null;
    messages: string[] | null;
    result: any | any[];
}

export interface ResultGenericModel {
    message:AlertMessageModel;
    result: any | any[];
}

export interface AlertMessageModel{
    severity: string;
    detail:string;

}