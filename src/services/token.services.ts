import jwt from 'jsonwebtoken';
import freeze from '../configs/freeze'
const generateToken = (payload: any) => {
  const { _id, isAdmin } = payload;

  const accessToken = jwt.sign(
    { _id, isAdmin },
    freeze.JWT_SECRET + '',
    {
      expiresIn: freeze.tokenLife,
    }
  );

  const refreshToken = jwt.sign(
    { _id, isAdmin },
    freeze.SECRET_REFRESH + '',
    {
      expiresIn: freeze.refreshTokenLife,
    }
  );

  return { accessToken, refreshToken };
};

const authService = {
  generateToken,
};
export default authService;