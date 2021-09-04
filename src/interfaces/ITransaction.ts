export interface ITransaction {
    _id: string;
    Type: string;
    User: string;
    Credit: string;
    Comission: string;
  }
  
  export interface ITransactionDTO {
    Date: string;
    User: string;
    Credit: string;
    Comission: string;
    Type: string;
  }