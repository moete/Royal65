export interface IUser {
    _id: string;
    name: string;
    email: string;
    address: string;
    password: string;
    country: string;
    username: string;
  }
  
  export interface IUserInputDTO {
    name: string;
    email: string;
    address: string;
    country: string;
    username: string;
  }