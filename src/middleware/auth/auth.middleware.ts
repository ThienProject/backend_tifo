import { validateToken, validateRefreshToken, generateToken } from './JWT'
import { Request, Response, NextFunction } from 'express'
import ApiError from '../../utils/ApiError';
import httpStatus from 'http-status';
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.authorization;
	const accessToken = accessTokenFromHeader?.split(' ')[1];


	const isValidToken = accessToken && validateToken(accessToken);
	if (!isValidToken) {
		const refreshTokenFromHeader = req.headers.refreshtoken?.toString();
		const refreshToken = refreshTokenFromHeader && refreshTokenFromHeader.split(' ')[1];
		const verifiedRefreshToken = refreshToken && validateRefreshToken(refreshToken);
		if (!verifiedRefreshToken) {
			next(new ApiError(httpStatus.BAD_GATEWAY, 'token is expired!'));
			// return  res.status(401).send();
		}
	}
	return next();
};