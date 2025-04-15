const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // 🔥 CORS middleware’i eklendi

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // ✅ CORS middleware’i burada
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

// Örnek route
app.get('/', (req, res) => {
  res.send('Backend API çalışıyor!');
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
