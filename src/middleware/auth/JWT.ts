const { sign, verify } = require("jsonwebtoken");
import freeze from "../../configs/freeze";

const generateToken = (payload: any) => {
  const { id_user, username, id_role } = payload;

  const accessToken = sign(
    { id_user, username, id_role },
    freeze.JWT_SECRET,
    {
      expiresIn: freeze.tokenLife,
    }
  );

  const refreshToken = sign(
    { id_user, username, id_role },
    freeze.SECRET_REFRESH,
    {
      expiresIn: freeze.refreshTokenLife,
    }
  );

  return { accessToken, refreshToken };
};

const validateToken = (accessToken: any) => {
  const key = freeze.JWT_SECRET;
  try {
    const validToken = verify(accessToken, key);
    return validToken
  } catch (error) {
    return false;
  }
};
const validateRefreshToken = (refreshToken: any) => {
  const key = freeze.SECRET_REFRESH;
  const validToken = verify(refreshToken, key);
  return validToken
}
export { generateToken, validateToken, validateRefreshToken };