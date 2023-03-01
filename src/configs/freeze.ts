const freeze = Object.freeze({
    JWT_SECRET: "tifosecret",
    SECRET_REFRESH: "tifosecretrefreshsecret",
    tokenLife: '30s',
    refreshTokenLife: '12h'
})
export default freeze;
