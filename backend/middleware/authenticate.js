const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Yetkilendirme hatası. Token bulunamadı.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Token içinden kullanıcı bilgisi alınır
        next();
    } catch (error) {
        res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token.' });
    }
};

module.exports = authenticate;
