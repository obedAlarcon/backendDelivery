const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./user.service');

const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    console.log('Usuario encontrado:', user);

    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Password coincide:', isMatch);

    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      token
    };
  }

  // Solicitar recuperación de contraseña
  async sendRecovery(email) {

    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id
    };

    const token = jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: '15min'
      }
    );

    const link = `http://localhost:4200/recovery?token=${token}`;

    await service.update(user.id, {
      recoveryToken: token
    });

    const mail = {
      from: config.smtpEmail,
      to: user.email,
      subject: 'Recuperación de contraseña',
      html: `
        <h2>Recuperación de contraseña</h2>

        <p>Has solicitado recuperar tu contraseña.</p>

        <p>
          Haz clic en el siguiente enlace para crear una nueva contraseña:
        </p>

        <a href="${link}">
          Recuperar contraseña
        </a>

        <p>Este enlace es válido durante 15 minutos.</p>
      `
    };

    const rta = await this.sendMail(mail);

    return rta;
  }

  // Cambiar contraseña
  // Cambiar contraseña
async changePassword(token, newPassword) {

  try {

  

    const payload = jwt.verify(
      token,
      config.jwtSecret
    );



    const user = await service.findOne(payload.sub);

    

    if (!user) {
      throw boom.unauthorized();
    }

    if (user.recoveryToken !== token) {

     

      throw boom.unauthorized();
    }

  

    const hash = await bcrypt.hash(
      newPassword,
      10
    );

   

    await service.update(user.id, {
      recoveryToken: null,
      password: hash
    });


    return {
      message: 'password changed'
    };

  } catch (error) {

    console.error(
      'ERROR EN changePassword:',
      error
    );

    throw boom.unauthorized();

  }
}
  // Enviar correo
  async sendMail(infoMail) {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,

      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });

    await transporter.sendMail(infoMail);

    return {
      message: 'mail sent'
    };
  }
}

module.exports = AuthService;