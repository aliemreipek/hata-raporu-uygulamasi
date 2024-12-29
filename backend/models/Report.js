const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['Düşük', 'Orta', 'Yüksek'], required: true },
    status: { type: String, enum: ['Açık', 'Kapalı', 'Çözüldü'], default: 'Açık' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);