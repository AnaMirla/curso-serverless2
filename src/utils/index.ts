import { hash, compare } from "bcryptjs";

export const hashPassword = async (plainPwd:string) => {
    return hash(plainPwd,8)
}

export const comparePasswords = async (plainPwd: string, hashedPwd: string) => {
    return compare(plainPwd, hashedPwd)
}