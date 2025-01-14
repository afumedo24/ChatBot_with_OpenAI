import { NextFunction, Request, Response } from "express"
import { body, ValidationChain, validationResult } from "express-validator"

export const validate = (validations: ValidationChain[]) => {
    return async (req:Request, res:Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            if(!result.isEmpty()) {
                break
            }
        }
        const errors = validationResult(req)
        if(errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({errors: errors.array()})       
    }

}

export const logInValidator = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min: 4}).withMessage("Password should contain atleast 4 Characters"),
]

export const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...logInValidator,
]
