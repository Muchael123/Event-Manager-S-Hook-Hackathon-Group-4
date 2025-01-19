import jwt from 'jsonwebtoken'
export default function verifyToken (req, res, next){
    const Token = req.header('Authorization')
    console.log(Token, "<<< this is the token")
    if (!Token) {
        res.status(401).json({ message: "Access denied" })
        return;
    }
    try {
        const decoded = jwt.verify(Token, process.env.JWT_SECRET);
        if (typeof decoded !== 'object' || !decoded?.userId) {      
            res.status(401).json({ message: "Access denied" });  
            return;
        }
        console.log(decoded, "<<< this is the decoded token")
        const payload = decoded;
        req.userId = payload?.userId;
        console.log(req.userId, "<<< this is the user id")
        next()
    } catch (e) {
      res.status(401).json({ message: "Access denied" });  
      return;
    }
}