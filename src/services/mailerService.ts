import { Service, Inject } from "typedi";
const nodemailer = require("nodemailer");

@Service()
export default class MailerService {
  transporter:any;
  constructor() {
    this.transporter= nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'tatyana.fahey@ethereal.email',
          pass: 'bCujKSrjBQmftMVjvG'
      }
        
      });
  }
  public async send(mailOptions:any,callback:any) {
    

    // send mail with defined transport object
   /* let mailOptions = {
      from: '"Royal65 Contact 👻" <contact@boitesetmoteurs.com>', // sender address
      to: "moetez.boubakri@esprit.tn", // list of receivers
      subject: "Contact Request ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };*/

    // send mail with defined transport object
     await  this.transporter.sendMail(mailOptions,callback);
  }
}