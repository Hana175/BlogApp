const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            res.status(401);
            throw new Error("Token not found");
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                res.status(403);
                throw new Error("Token not valid");
            }
            req.user = user;
            next();
        });
    }

});
module.exports = validateToken;