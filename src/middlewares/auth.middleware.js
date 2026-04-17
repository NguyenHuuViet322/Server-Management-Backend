import JwtService from "../services/jwt.service";
import {BadTokenError, UnauthorizedError} from "../utils/ApiError"

const authMiddleware = async (req, res, next) => {
  try {

    const publicAPIs = [
      "/auth",
    ];

    if (publicAPIs.includes(req.path)) {
      return next();
    }

    if (process.env.SERVER_JWT === "false") return next();

    const token = JwtService.jwtGetToken(req);

    const decoded = JwtService.jwtVerify(token);

    console.log(decoded);

    req.userId = decoded.id;
    req.role = decoded.role;

    return next();
  } catch (error) {
    console.log(error);
    next(new BadTokenError())
  }
};

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const role = req.role;
    if (roles.includes(role)) {
      return next();
    }
    else return next(new UnauthorizedError());
  }
}

export {authMiddleware, roleMiddleware};
