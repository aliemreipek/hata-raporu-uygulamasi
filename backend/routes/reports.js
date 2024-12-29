const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const authenticate = require('../middleware/authenticate');

module.exports = router;


//router.use(authenticate); // Tüm route'lar için geçerli

// Kullanıcının kendi raporlarını getir
router.get('/my-reports', authenticate, async (req, res) => {
    try {
        const userId = req.user.id; // JWT'den gelen kullanıcı kimliği
        const reports = await Report.find({ userId });
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Raporlar alınamadı.' });
    }
});

// Yeni bir rapor oluştur
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const userId = req.user.id;

        const newReport = new Report({ title, description, priority, status, userId });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Rapor oluşturulamadı.' });
    }
});

// Hata raporlarını getir
router.get('/', async (req, res) => {
    try {
        const { status, sortBy } = req.query;

        // Sorgu filtresi oluştur
        const query = {};
        if (status) {
            const statuses = status.split(',');
            query.status = { $in: statuses };
        }

        // Sıralama işlemi için seçenekler
        const sortOptions = {};
        if (sortBy) {
            const [field, order] = sortBy.startsWith('-')
                ? [sortBy.substring(1), -1] // '-' varsa azalan
                : [sortBy, 1]; // Yoksa artan
            sortOptions[field] = order;
        }

        // Veritabanından filtre ve sıralama işlemi
        const reports = await Report.find(query).sort(sortOptions);
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hata raporları alınamadı.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Rapor bulunamadı.' });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Rapor alınamadı.' });
    }
});

module.exports = router;
