const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP settings
    auth: {
      user: 'meher@gmail.com',
      pass: '123456789' // use an App Password, not your Gmail password
    }
  });

  const mailOptions = {
    from: email,
    to: 'meher2ch@gmail.com',
    subject: `New message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(500).json({ message: 'Failed to send email.' });
    } else {
      res.status(200).json({ message: 'Email sent successfully!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
