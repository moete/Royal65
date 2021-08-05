import { Service,Inject } from "typedi";
const nodemailer = require("nodemailer");


@Service()
export default class MailService {

    constructor ( ){}
    public async main() {


        let transporter = nodemailer.createTransport({
            host: 'https://pro2.mail.ovh.net ' ,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'contact@boitesetmoteurs.com'	, // generated ethereal user
              pass: 'B967C73C', // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info = {
            from: '"Royal65 Contact 👻" <contact@boitesetmoteurs.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          };
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
      
}