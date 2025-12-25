import User from '../models/usermodel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../lib/utils.js'
export const signUp = async (req, res) => {
    const { fullname, password, email } = req.body;

    try {
        if (!fullname || !password || !email) return res.status(400).json({ message: "All fields are required" });

        if (password.length < 6) {
            return res.status(400).json({ message: "Password length atleast 6 characters" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in Signup controller ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
    // res.send("Signup successfully");
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log("Login", req.body);
    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credential" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credential" });

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePuc: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ messsage: "Internal server error" });
    }
    // res.send("login successfully");
}


export const logOut = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ messsage: "Internal server error" });
    }
    // res.send("logout successfully");
}





