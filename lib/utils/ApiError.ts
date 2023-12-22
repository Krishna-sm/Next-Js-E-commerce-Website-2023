export class ApiError extends Error{
    statusCode:number;
    constructor(statusCode:number,message:string,stack =''){
        super(message);
        this.message= message;
        this.statusCode= statusCode;
        if(stack){
            this.stack =stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }



    }
}