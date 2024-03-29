import { response } from 'express';
import { Service } from 'typedi';
import { IUser } from "../interfaces/IUser";
const db = require("../models");
var bcrypt = require("bcryptjs");
const UserModel = db.user;
const EmailModel = db.emailVerification;
const RoleModel = db.role;
const ForgotPasswordModel = db.forgotPassword;
@Service()
export default class UserService {
  async checkDuplicate(email: string, username: string) {
    const user = await UserModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    return user;
  }

  async save(userBody: IUser) {
    let user = new UserModel({
      email: userBody.email,
      //   name: userBody.name,
      //   address: userBody.address,
      country: userBody.country,
      username: userBody.username,
      //  photo: userBody.photo,
      //Code: userBody.Code,
      password: bcrypt.hashSync(userBody.password, 8),
    });

    user = await user.save();
    if (user) {
      const email = new EmailModel({
        email: user.email,
        token:
          Math.random().toString(36).substr(2) +
          Math.random().toString(36).substr(2),
      });
      email.save();
    }

    return user;
  }
  async updateProfile(_id: any, userBody: IUser) {
    return UserModel.findOneAndUpdate({ _id }, userBody, {
      new: true,
    });
  }
  // async updateProfile(userBody: IUser) {
  //   // let user = new UserModel({
  //   //   email: userBody.email,
  //   //   name: userBody.name,
  //   //   address: userBody.address,
  //   //   country: userBody.country,
  //   //   username: userBody.username,
  //   //   photo: userBody.photo,
  //   //   password: bcrypt.hashSync(userBody.password, 8),
  //   // });
  //   // user.save();
  //   // // user = await user.save();
  //   // // if (user) {
  //   // //   const email = new EmailModel({
  //   // //     email: user.email,
  //   // //     token:
  //   // //       Math.random().toString(36).substr(2) +
  //   // //       Math.random().toString(36).substr(2),
  //   // //   });
  //   // //   email.save();
  //   // // }
  // }

  async updateAdmin(_id: any, userBody: IUser) {
    return UserModel.findOneAndUpdate({ _id }, userBody, {
      new: true,
    });
  }

  async update(_id: any, userBody: any) {
    return UserModel.findOneAndUpdate({ _id }, userBody, {
      new: true,
    });
  }
  
  
  async updateWallet({userId,amount}:any){
    const user=await UserModel.findById(userId)
    if(!user){
      return {message:"User Not found"};
    }
    user.wallet= user.wallet + amount;
    return await user.save();
  }

  findOneByEmailOrUsername(param: string) {
    return UserModel.findOne({
      $or: [{ email: param }, { username: param }],
    }).populate("roles", "-__v");
  }

  findOneByEmail(param: string) {
    return UserModel.findOne({ email: param });
  }

  async count() {
    const count: Number = await UserModel.countDocuments({});
    return count;
  }

  async getLastRegistred() {
    const role = await RoleModel.findOne({ name: "user" });
    const last = await UserModel.find({ roles: role._id })
      .sort("-createdAt")
      .limit(10);
    return last;
  }

  async getAllUsers() {
    const role = await RoleModel.findOne({ name: "user" });
    const last = await UserModel.find({ roles: role._id }).sort("-createdAt");
    return last;
  }

  async getAllUsersEmails() {
    const role = await RoleModel.findOne({ name: "user" });
    const last = await UserModel.find({ roles: role._id }, "email").sort(
      "-createdAt"
    );
    return last;
  }

  async getVerfiedUsersEmails() {
    const role = await RoleModel.findOne({ name: "user" });
    const last = await UserModel.find(
      { roles: role._id, verified: true },
      "email"
    ).sort("-createdAt");
    return last;
  }

  async statistcsByCountry() {
    const stat = await UserModel.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);
    return stat;
  }

  async getEmailVerfication(email: string, token: string) {
    const val = await EmailModel.findOne({ email, token });
    return val;
  }

    // ref 
    async getUserByCode(Code:String){
      const ref = await UserModel.findOne({Code:Code});
      
      return ref ;
    }

    async getUserById(_id:String){
      const user = await UserModel.findOne({_id});
      return user
    }

    async getUserByEmail(email:String){
      const user = await UserModel.findOne({email});
      return user
    }

    async getWalletbyEmail(email:String)
    {
      const user = await UserModel.findOne({email:email});
      return user.wallet;
    }
  
  deleteUser(_id: any) {
    return UserModel.deleteOne({ _id });
  }

  


async updateProfilePassword(email: any, userBody: IUser) {
  return UserModel.findOneAndUpdate({ email }, userBody, {
    new: true,
  });
}

  async deleteEmailVerfication(_id: any) {
    const val = await EmailModel.deleteOne({ _id }, function (err: any) {
      if (err) return console.log(err);
      // deleted at most one tank document
    });
  }
}
