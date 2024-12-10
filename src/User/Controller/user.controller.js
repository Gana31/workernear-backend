// userRegisterController.js
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import UserService from "../Service/user.service.js";

class userRegisterController {

    userRegister = async (req, res, next) => {
        try {
            const { name, email, password, account_type } = req.body;
            
            // Validate input
            if (!name) throw new ApiError(400, "Name is required");
            if (!email) throw new ApiError(400, "Email is required");
            if (!password) throw new ApiError(400, "Password is required");
            if (!account_type) throw new ApiError(400, "Account type is required");

            // Call service method to register user
            const data = await UserService.userRegisterService(req.body);

            // Respond if data is successfully returned
            if (data) {
                res.status(201).json(new ApiResponse(201, "registered successfully", data));
            }
            
        } catch (error) {
            // Pass the error to the global error handler
            next(error);
        }
    }
    userlogin = async (req, res, next) => {
        try {
            const {email, password } = req.body;

            // Validate input
    
            if (!email) throw new ApiError(400, "Email is required");
            if (!password) throw new ApiError(400, "Password is required");


            const data = await UserService.userLoginService(req.body,res);

            // Respond if data is successfully returned
            if (data) {
                res.status(201).json(new ApiResponse(201, "User Login successfully", data));
            }
            
        } catch (error) {
            // Pass the error to the global error handler
            next(error);
        }
    }
}

export default new userRegisterController();
