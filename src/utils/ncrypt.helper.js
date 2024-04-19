import bcrypt from 'bcryptjs';

export class NcryptHelper {
    static hash(password) {
        return bcrypt.hashSync(password)
    }

    static compare(password, hashed) {
        return bcrypt.compareSync(password, hashed)
    }
}