import * as bcrypt from 'bcrypt'
import * as dotenv from "dotenv";
dotenv.config();
export const encryptPassword = (password: String) => (
    bcrypt.hash(password as string, Number(process.env.SALT_ROUNDS)))
