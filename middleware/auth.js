import jwt from 'jsonwebtoken';



const auth = async(req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next(); // 跳过 OPTIONS 请求的认证
      }
    
    try {
        // 检查 Authorization 是否存在
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
        
    }
}

export default auth;