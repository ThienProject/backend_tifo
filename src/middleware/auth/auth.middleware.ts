import { validateToken, validateRefreshToken, generateToken } from './JWT'
import { Request, Response, NextFunction } from 'express'
import ApiError from '../../utils/ApiError';
import httpStatus from 'http-status';
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	// Lấy access token từ header
	try {
		const accessTokenFromHeader = req.headers.authorization;
		const refreshTokenFromHeader = req.headers.refreshtoken?.toString() || '';
		const accessToken = accessTokenFromHeader?.split(' ')[1];
		const refreshToken = refreshTokenFromHeader && refreshTokenFromHeader.split(' ')[1];
		const isValidToken = accessToken && validateToken(accessToken);
		// console.log("isValidToken", isValidToken);
		// console.log("accessToken", accessTokenFromHeader);
		// console.log("refreshToken--------------------------------------------------------------------------");
		// console.log("refreshToken", refreshToken);
		if (!isValidToken) {
			const verifiedRefreshToken = refreshToken && validateRefreshToken(refreshToken);
			console.log("verifiedRefreshToken", verifiedRefreshToken);
			if (!verifiedRefreshToken) {
				console.log("....................................")
				next();
				// return  res.status(401).send();
			}
		}
		return next();
	} catch (error) {
		next(new ApiError(httpStatus.UNAUTHORIZED, 'Login timeout. Please login again !'));
	}
};