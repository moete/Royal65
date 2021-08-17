export interface ITransaction {
    _id: string;
    ReferenceFrom: string;
    ReferenceTo: string;
    Code: string;
    Bonus: string;
  }
  
  export interface ITransactionDTO {
    ReferenceFrom: string;
    ReferenceTo: string;
    Code: string;
    Bonus: string;
  }