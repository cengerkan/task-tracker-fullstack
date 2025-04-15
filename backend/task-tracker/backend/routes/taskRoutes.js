const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Yeni görev oluştur
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: 'Görev kaydedilemedi' });
  }
});

// Tüm görevleri getir
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Görevler alınamadı' });
  }
});




router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // güncellenmiş veriyi döndürsün
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Görev güncellenemedi' });
  }
});

// Görevi sil
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Görev silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Görev silinemedi' });
  }
});

module.exports = router;
