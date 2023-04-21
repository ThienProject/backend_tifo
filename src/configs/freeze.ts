const freeze = Object.freeze({
    JWT_SECRET: "tifosecret",
    SECRET_REFRESH: "tifosecretrefreshsecret",
    tokenLife: '1h',
    refreshTokenLife: '24h'
})
export default freeze;
