const user = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../util/constants")


const verifyToken = (req, res, next) => {
    let token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

        try {
            const resp = jwt.verify(token, config.JWT_SECRET_KEY)
            req.user = resp._id;
            next();
        } catch (error) {
            return res.status(401).json({
                message: error.message
            })
        }
    } else {
        return res.status(401).json({
            message: "Authentication failed: No token provided."
        })
    }
}

const verifyUser = (req, res, next) => {
    try {
        verifyToken(req, res, async () => {
            const resp = await user.findById(req.user)
            console.log('resp', resp);
            if (resp.isActive) {
                next();
            } else {
                return res.status(401).json({
                    userBlocked: true, message: "You are not Authorized"
                })
            }
        })
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }
}

module.exports = { verifyUser }