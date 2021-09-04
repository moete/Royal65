import { Service, Inject } from "typedi";
const nodemailer = require("nodemailer");

@Service()
export default class MailService {
  constructor() {}
  public async main() {
    let transporter = nodemailer.createTransport({
      host: "https://pro2.mail.ovh.net ",
      port: 587,
      pool:true,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "contact@boitesetmoteurs.com", // generated ethereal user
        pass: "B967C73C", // generated ethereal password
      },
      
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let mailOptions = {
      from: '"Royal65 Contact 👻" <contact@boitesetmoteurs.com>', // sender address
      to: "moetez.boubakri@esprit.tn", // list of receivers
      subject: "Contact Request ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error: Error, info: any) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  }
}
