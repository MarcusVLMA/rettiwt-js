const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: 'Missing authorization token' });
    }

    const authParts = authHeader.split(' ');

    if(!authParts.length === 2) {
        return res.status(401).json({ error: 'Malformed authorization header' });
    }

    const [ scheme, token ] = authParts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Malformed token' });
    }

    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.AUTH_SECRET_HASH, (error, decoded) => {
        if(error) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.userId = decoded.id;

        return next();
    });    
};