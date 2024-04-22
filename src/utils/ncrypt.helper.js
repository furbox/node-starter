import bcrypt from 'bcryptjs';

export class NcryptHelper {
    static hash(password) {
        return bcrypt.hashSync(password)
    }

    static compare(password, hashed) {
        return bcrypt.compareSync(password, hashed)
    }

    static createCode(){
        const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let code = "";
        for(let i = 0; i < 8; i++){
            code += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return code;
    }
}