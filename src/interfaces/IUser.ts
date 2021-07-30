export interface IUser {
    _id: string;
    name: string;
    email: string;
    address: string;
    password: string;
    country: string;
    username: string;
    salt: string;
  }
  
  export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
  }