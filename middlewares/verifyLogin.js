const jwt = require("jsonwebtoken");

const verifyLogin = (req, res, next) => {

    try {
        const token = req.header("Authorization").split(" ")[1];

        if (!token) return res.send({ status: "fail", data: { login: "Can't access! Needs login to continue" } });

        const user = jwt.verify(token, process.env.ACCESS_TOKEN);
        // const userId = User.findById(user._id);
        // req.user = userId;
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.send({ status: "error", message: "Access denied!" });
    }
}

module.exports.verifyLogin = verifyLogin;