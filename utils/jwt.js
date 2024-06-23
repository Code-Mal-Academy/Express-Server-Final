// jwt.js
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Replace with your secret key

export function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: 10000 }); // Token expires in 1 hour
}

export function verifyToken(token) {
    return jwt.verify(token, secretKey);
}
