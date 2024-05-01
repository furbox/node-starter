import Mailjet from 'node-mailjet';
import envs from '../config/envs.js'


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
    sendMail(to, subject, html)
}

export const sendEmailNewPass = (to, pass) => {
    const subject = "Password Recovery";
    const html =`
        <h1>Su nueva contraseña</h1>
        <h2>Es necesarío que cambie las contraseña posteriormente</h2>
        <p>Password: ${pass}</p>
    `;

    sendMail(to, subject, html)
}



