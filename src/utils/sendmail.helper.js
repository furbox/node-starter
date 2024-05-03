import Mailjet from 'node-mailjet';
import envs from '../config/envs.js';
import fs from 'node:fs';


export const sendMail = (to, subject, html) => {
    const mailjet = new Mailjet({
        apiKey: envs.MJ_APIKEY_PUBLIC,
        apiSecret: envs.MJ_APIKEY_PRIVATE,
    });

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "furbox@gmail.com",
                        Name: "No Reply"
                    },
                    To: [
                        {
                            Email: to,
                        }
                    ],
                    Subject: subject,
                    HTMLPart: html
                }
            ]
        })

    request
        .then((result) => {
            // console.log(result.body)
            //logíca de envio de email base de datos, cron, notificaciones, etc
            return true
        })
        .catch((err) => {
            //console.log(err.statusCode)
            //logíca de fallos en el envio de email base de datos, cron, notificaciones, etc
            return false
        })

}

export const sendEmailCodeValidation = (to, link) => {
    const subject = "Email Validation";
    const html = `
        <h1>Gracias por registrarte<h1>
        <p>Para validar tu email haz click en el siguiente encale</p>
        <a href="${link}">Validar cuenta</a>
    `;
    const data = {
        subject,
        to,
        html
    }
    sendEmailPlantilla(data)
}

export const sendEmailNewPass = (to, pass) => {
    const subject = "Password Recovery";
    const html = `
        <h1>Su nueva contraseña</h1>
        <h2>Es necesarío que cambie las contraseña posteriormente</h2>
        <p>Password: ${pass}</p>
    `;

    const data = {
        subject,
        to,
        html
    }

    sendEmailPlantilla(data)
}

export const sendEmailPlantilla = (data) => {
    const htmlTemplatePath = `./public/email-templates/alert.html`
    let html = fs.readFileSync(htmlTemplatePath, 'utf8')
    const logo = 'https://res.cloudinary.com/doe4nhc8o/image/upload/v1714776962/dcuowten64cdg48tgeof.jpg';

    html = html.replace(/APP_NAME/g, envs.APP_NAME)
    html = html.replace(/LOGO/g, logo)
    html = html.replace(/TITLE/g, data.subject)
    html = html.replace(/P_DESC/g, data.html)
    html = html.replace(/YEAR/g, new Date().getFullYear())

    sendMail(data.to, data.subject, html)
}


