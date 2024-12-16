import { Router } from "express";
import { getAllUsers, createUser, logInUser, verifyUser } from "../controllers/user-controllers.js"
import { validate, signUpValidator, logInValidator } from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router()

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup" ,validate(signUpValidator) ,createUser )
userRoutes.post("/login" ,validate(logInValidator) ,logInUser )
userRoutes.get("/auth-status", verifyToken, verifyUser);


export default userRoutes