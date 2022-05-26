const jwt = require('jsonwebtoken');
require('dotenv/config')

module.exports = {
    signAccessToken: (userId, isAdmin) => {
        const accessToken = jwt.sign({
                userId,
                isAdmin,
            },
            process.env.ACCESS_TOKEN,
        );
        return accessToken;
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next();
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const accessToken = bearerToken[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, payload) => {
            if (err) return next();
            req.payload = payload;
            next();
        });
    }
}