import { Service, Inject } from "typedi";
const nodemailer = require("nodemailer");

@Service()
export default class MailerService {
  transporter:any;
  constructor() {
    this.transporter= nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        pool:true,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "dahtest1@gmail.com", // generated ethereal user
          pass: "Mohamed28243854", // generated ethereal password
        },
        
        tls: {
          rejectUnauthorized: false,
        },
      });
  }
  public async send(mailOptions:any) {
    

    // send mail with defined transport object
   /* let mailOptions = {
      from: '"Royal65 Contact 👻" <contact@boitesetmoteurs.com>', // sender address
      to: "moetez.boubakri@esprit.tn", // list of receivers
      subject: "Contact Request ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };*/

    // send mail with defined transport object
    return await this.transporter.sendMail(mailOptions);
  }
}