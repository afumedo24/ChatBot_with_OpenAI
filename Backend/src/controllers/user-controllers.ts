import { Request,Response, NextFunction } from "express"
import User from "../models/user-model.js"
import { hash, compare} from "bcrypt"
import { createToken } from "../utils/token-manager.js"

export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await User.find()
        return res.status(200).json({ msg: "OK", user: users})
    } catch(err) {
        return res.status(500).json({ msg: "Internal Server Error", error: err.message})
    }
}

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({msg: "User already exists"})           
        }
        const hashedPassword = await hash(password, 10)
        const newUser = new User({name, email, password: hashedPassword })
        await newUser.save()

        return res.status(201).json({msg: "OK", name: newUser.name.toString(), email: newUser.email.toString()})


    } catch(err) {
        console.log("Error in the createUser: ", err)
        return res.status(500).json({msg: "ERROR", Error: err.message})
    }

}

export const logInUser = async (req:Request, res:Response, next:NextFunction) => {
    console.log("logInUser triggered");
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({msg: "Email not Found. Please Signup!"})
        }
        const passwordChceck = await compare(password, user.password)
        if (!passwordChceck) {
            return res.status(400).json({msg: "Invalid Password"})
        }

        res.clearCookie("auth_token", {path: "/", domain: "localhost", httpOnly: true, signed: true})

        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        const token = createToken(user._id.toString(), user.email)
        res.cookie("auth_token", token, {path:"/", domain: "localhost", expires: expires, httpOnly: true, signed: true})

        return res.status(200).json({msg: "Logged In", name: user.name.toString(), email: user.email.toString()})

        
    } catch (err) {
        console.log("Error in the logInUser: ", err)
        return res.status(500).json({msg: "ERROR", Error: err.message})
    }
}

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log("verifyUser triggered");
    try {
        if (!res.locals.jwtData) {
            console.error("No JWT data found in response locals.");
            return res.status(401).send("Invalid authentication state.");
        }
        console.log("Decoded JWT data:", res.locals.jwtData);

        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not found.");
        }

        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.error("Error in verifyUser:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
