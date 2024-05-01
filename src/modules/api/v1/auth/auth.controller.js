import getBaseUrl from "../../../../utils/base-url.helper.js";
import { NcryptHelper } from "../../../../utils/ncrypt.helper.js";
import { sendEmailCodeValidation, sendEmailNewPass } from "../../../../utils/sendmail.helper.js";
import UserModel from "../users/users.model.js";

export default class authController {
    constructor() {
        this.userModel = new UserModel();
        this.hashPassword = NcryptHelper.hash;
        this.comparePassword = NcryptHelper.compare;
        this.createCode = NcryptHelper.createCode;
    }

    register = async (req, res) => {
        const { fullname, email, pass } = req.body;

        const newUser = {
            user_fullname: fullname,
            user_email: email,
            user_pass: this.hashPassword(pass)
        }

        try {
            //validar que el email se unico

            const existUser = await this.userModel.getByEmail(email);
            if (existUser) {
                return res.status(400).json({
                    message: "El Email ya existe"
                })
            }

            newUser.user_code = this.createCode();

            await this.userModel.create(newUser)

            //TODO: enviar email para verificar el correo
            const baseUrl = getBaseUrl(req);
            const link = baseUrl + "/api/v1/auth/verify/" + newUser.user_code;
            
            sendEmailCodeValidation(newUser.user_email,link);

            res.status(201).json({
                message: "Usuario creado con exito"
            })

        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    login = async (req, res) => {
        const { email, pass } = req.body;

        try {
            const user = await this.userModel.getByEmail(email)
            if (!user) {
                return res.status(400).json({
                    message: "Email o la Contraseña es incorrecta"
                })
            }

            //TODO: Validar el medio por el cual se registro (google,facebook,twitter,instagram, github)

            //validar contraseña
            if (!this.comparePassword(pass, user.user_pass)) {
                return res.status(400).json({
                    message: "Email o la Contraseña es incorrecta"
                })
            }

            //validar usuario verificado
            if (!user.user_verify) {
                return res.status(400).json({
                    message: "Es necesario verificar su email"
                })
            }

            //verificar si su status es true
            if (!user.user_status) {
                return res.status(400).json({
                    message: "Usuario Eliminado"
                })
            }

            //TODO: crear cookies y sessions redis
            req.session.user_id = user.user_id;
            req.session.user_email = user.user_email

            //actualizar informacion de inicio de sesion
            user.user_lastloginAt = new Date();
            await this.userModel.update(user.user_id, user)

            res.json({
                message: "Login exitoso"
            })

        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    verify = async (req, res) => {
        const code = req.params.code;
        if (!code) {
            return res.status(400).json({
                message: "Información no valida"
            })
        }

        try {
            //TODO: cambiar metodo y agregar atributo user_code
            const user = await this.userModel.getByCode(code)
            if (!user) {
                return res.status(400).json({
                    message: "Datos incorrectos"
                })
            }

            //verificar estado del verify
            if (user.user_verify) {
                return res.json({
                    message: "Cuenta verificada"
                })
            }

            user.user_verify = true;
            user.user_code = "";
            user.user_updatedAt = new Date();
            await this.userModel.update(user.user_id, user)

            res.json({
                message: "Cuenta verificada"
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    recover = async (req, res) => {
        const { email } = req.body;
        try {
            const user = await this.userModel.getByEmail(email)
            if (!user) {
                return res.status(400).json({
                    message: "Datos no Validos"
                })
            }

            const pass = this.createCode();
            user.user_pass = this.hashPassword(pass)
            await this.userModel.update(user.user_id, user)

            //TODO: Enviar Email con la nueva contraseña pass
            sendEmailNewPass(user.user_email, pass)

            res.json({
                message: "Hemos enviado tu nueva contraseña a tu email. Es mecesario que cambie la contraseña por una de su agrado!"
            })

        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    changePassword = async (req, res) => {
        const { email, pass, newPassword } = req.body;
        try {
            const user = await this.userModel.getByEmail(email)
            if (!user) {
                return res.status(400).json({
                    message: "Datos no Validos"
                })
            }

            //validar contraseña actual
            if (!this.comparePassword(pass, user.user_pass)) {
                return res.status(400).json({
                    message: "Datos no Validos"
                })
            }

            user.user_pass = this.hashPassword(newPassword)
            await this.userModel.update(user.user_id, user)

            res.json({
                message: "Contraseña Actualizada"
            })

        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}