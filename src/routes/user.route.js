import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controller/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(verifyJWT,logoutUser);
router.route('/current-user').get(verifyJWT,getCurrentUser);
router.route('/update-token').get(refreshAccessToken);
export default router;