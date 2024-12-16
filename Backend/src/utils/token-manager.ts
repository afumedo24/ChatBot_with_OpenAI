import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';


export const createToken = (id:string, email:string) => {
    const payload = { id, email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"})
    return token
}

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  console.log("VerifyToken middleware triggered");
  const token = req.signedCookies?.auth_token;
  if (!token) {
    console.log("Token not found in request.");
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    res.locals.jwtData = decoded; 
    next();
  });
};