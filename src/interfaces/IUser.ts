export interface IUser {
  _id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  country: string;
  username: string;
  photo:string;
  Code : string;
  wallet: Number,
}

export interface IUserInputDTO {
  name: string;
  email: string;
  address: string;
  country: string;
  username: string;
  Code : string;
  wallet : Number;
}