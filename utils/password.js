import bcrypt from 'bcrypt';

const saltRounds = 1;

export async function hashPassword(plainTextPassword) {



    try {
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        return hash;
    } catch (err) {
        console.error(err);
        throw new Error('Error hashing password');
    }
}

export async function comparePassword(plainTextPassword, hash) {
    const isMatch = await bcrypt.compare(plainTextPassword, hash);
    return isMatch;
}