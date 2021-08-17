export interface ITransaction {
    _id: string;
    Type: string;
    User: string;
    Credit: string;
    Coins: string;
  }
  
  export interface ITransactionDTO {
    Date: string;
    User: string;
    Coins: string;
    Type: string;
  }