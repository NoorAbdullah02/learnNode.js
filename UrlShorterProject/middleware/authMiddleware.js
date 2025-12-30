export function authenticationMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({ message: "Invalid Token Please Login Again" });
    }


}