import jwt from 'jsonwebtoken'

function validateJWT() {
    return (req, res, next) => {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedToken.userId;
            if(!decodedToken.userId) {
                throw new Error("Invalid Token. Couldn't extract userId from decoded token");
            }
            next();
        } catch(e) {
            console.log(e);
            return res.status(401).json({message: "Invalid Token"});
        }
    };
}

export default validateJWT;