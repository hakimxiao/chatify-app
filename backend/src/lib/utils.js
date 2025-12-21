import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
    const { JWT_SECRET } = process.env;
    if(!JWT_SECRET) throw new Error("JWT_SECRET not defined");

    // buat token 
    const token = jwt.sign({userId}, JWT_SECRET, {expiresIn: '7d'});

    res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari dalam milidetik
            httpOnly: true, // prevent XSS attacks: cross-site scripting
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        }
    );

    return token;
};
