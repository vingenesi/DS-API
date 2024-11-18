const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (to, subject, text, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // email admin
        pass: process.env.EMAIL_PASS // senha admin
      }
    });
    const mailOptions = {
      from: process.env.EMAIL_USER, // Remetente
      to: to, // Destinatário, agora passado como argumento
      subject, // Assunto
      text // Corpo do e-mail
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Erro ao enviar e-mail:", error);
        return res.status(500).json({ error: "Falha no envio de e-mail." });
      } else {
        console.log("E-mail enviado:", info.response);
        return res
          .status(200)
          .json({ message: "Usuário criado e e-mail enviado com sucesso." }); 
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao manda o email usuário." });
  }
};

module.exports = {
  sendEmail
};
