const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');  // Добавляем CORS

const app = express();

// Включаем CORS для всех маршрутов
app.use(cors());
app.use(bodyParser.json());

const token = '2072544776:AAHid2-rLgdcYxOAJxdCQdeE_Yv1IfVX7x4';
const chat_id = '488033556';

app.post('/send-message', async (req, res) => {
  const { name, attendance, food, alco } = req.body;

  const message = `ФИО: ${name}\nПрисутствие: ${attendance}\nПредпочтение еды: ${food}\n Алкоголь: ${alco}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id,
      text: message,
    });
    res.status(200).send('Сообщение успешно отправлено');
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error);
    res.status(500).send('Ошибка отправки сообщения');
  }
});

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});
