import {generateToken} from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({message: "Password must be at least 6 characters"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        const user = await User.findOne({email});
        if (user) return res.status(400).json({message: "Email already exists"});

        // hashing password saat krim ke DB
        const salt = await bcrypt.genSalt(10); // panjang hashing
        const hashedPassword = await bcrypt.hash(password, salt); // password di hashing

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                message: "User created successfully",
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            //   TODO: send a welcome email to user
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signUp controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};
