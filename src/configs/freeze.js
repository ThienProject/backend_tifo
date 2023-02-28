const freeze = Object.freeze({
    JWT_SECRET : "tifosecret",
    SECRET_REFRESH: "tifosecretrefreshsecret",
    tokenLife: 5,
    refreshTokenLife: '12h'
})
export default freeze;
