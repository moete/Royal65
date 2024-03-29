import config from "../../config";
import { Request, Response } from "express";
var jwt = require("jsonwebtoken");
import Services from "../../services/";
const fs = require("fs");
var uniqid = require("uniqid");
const nodemailer = require("nodemailer");
const userService: any = new Services.UserService();
const roleService: any = new Services.RoleService();
const referenceService: any = new Services.ReferenceService();
const ForgotPasswordService: any = new Services.ForgotPasswordService();
const expiresIn = 86400;
var bcrypt = require("bcryptjs");
const mailService: any = new Services.MailService();
const mailerService: any = new Services.MailerService();

const signup = async (req: any, res: Response) => {
  const userDTO = req.body;
  const refcode = req.query.code;
  const code = uniqid();
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  let user = await userService.checkDuplicate(userDTO.email, userDTO.username);
  if (user) {
    return res
      .status(400)
      .send({ message: "Failed! Username or Email is already in use!" });
  }
  user = userService.save({
    username: userDTO.username,
    email: userDTO.email,
    country: userDTO.country,
    password: userDTO.password,
  });
  user
    .then(async (user: any) => {
      const role = await roleService.findOneByName("user");

      user.roles = [role._id];
      user.save((err: any) => {
        if (err) {
          res.status(500).send({ message: "Something went wrong!" });
          return;
        }

        res.status(200).send({
          message:
            "You were registered successfully , we have just to review you current state !",
        });
      });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).send({ message: "Please Verify your information!" });
    });
};

const signin = (req: Request, res: Response) => {
  let { username, isAdmin, password } = req.body;

  userService.findOneByEmailOrUsername(username).exec((err: any, user: any) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong!" });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    if (!user.verified) {
      return res
        .status(400)
        .send({ message: "You need to verify your account." });
    }
    if (!user.active) {
      return res.status(400).send({ message: "Your account is suspended." });
    }

    if (isAdmin) {
      const getAdmin = user.roles.filter((role: any) => role.name === "admin");
      if (getAdmin.length == 0)
        return res.status(401).send({ message: "Unauthorized" });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Info!",
      });
    }
    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(404).send({
        accessToken: null,
        message: "Invalid Info!",
      });
    }

    var token = jwt.sign({ id: user.id }, config.SECRET, {
      expiresIn, // 24 hours
    });

    var authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      wallet: user.wallet,
      roles: authorities,
      accessToken: token,
      expiresIn,
    });
  });
};

const forgotpassword = async (req: any, res: Response) => {
  var recepient = req.body.email;
  let token = uniqid();
  console.log(recepient);
  userService.findOneByEmail(recepient).exec((err: any, user: any) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    } else {
      ForgotPasswordService.save({
        email: recepient,
        token: token,
      });
      const mailOption = {
        from: '"Royal65 Contact 👻" <contact@boitesetmoteurs.com>', // sender address
        to: recepient, // list of receivers
        subject: "ForgotPassword", // Subject line
        text: "http://localhost:3000/#/?email=" + recepient + "&token=" + token, // html body
      };
      console.log(mailOption);
      mailerService.send(mailOption, (error: Error, info: any) => {
        if (error) {
          res
            .status(500)
            .send({ message: "An error has occurred while sending!" });
          return console.log(error, "*********************");
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        mailService.save({
          email_subject: mailOption.subject,
          email_content: mailOption.text,
          folder: 0,
          read: false,
          to: mailOption.to,
        });
        res.status(200).send({ message: "Successfully sent email" });
      });
    }
  });
};

const resetpassword = async (req: any, res: Response) => {
  console.log(req.body);
  var token = req.body.token;
  ForgotPasswordService.getforgotpasswordbyToken(token).exec(
    (err: any, forgotpass: any) => {
      if (err) {
        res
          .status(500)
          .send({ message: "An error has occurred while sending!" });
        return console.log(err, "*********************");
      }
      if (!forgotpass) {
        return res.status(404).send({ message: "No request found" });
      } else {
        userService
          .findOneByEmail(req.body.email)
          .exec((err: any, user: any) => {
            console.log(user);
            if (!user) {
              return res.status(404).send({ message: "no user" });
            }
            if (!req.body.password) {
              return res.status(404).send({ message: "no password" });
            }
            user.password = bcrypt.hashSync(req.body.password, 8);

            const userupdate = userService.updateProfile(user._id, user);
            userupdate
              .then(async (user: any) => {
                res.send({ message: "User was updated successfully!" });
              })
              .catch((err: any) => {
                console.log(err);
                res
                  .status(500)
                  .send({ message: "Please Verify your information!" });
              });
          });
      }
    }
  );
};

export default {
  signin,
  signup,
  forgotpassword,
  resetpassword,
};
