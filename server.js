require('dotenv').config();

const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const validator = require('validator');

const port = process.env['SERVER_PORT'] || 4000;
const app = express();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.enable('trust proxy');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '30mb' }));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const prepDataURL = (url, type) => {
  return url.replace(`data:${type};base64,`, '');
};

const cleanData = (data) => {
  console.log(data);
  if (typeof data.surname != 'string') {
    data.surname = '';
  }

  if (typeof data.name != 'string') {
    data.name = '';
  }

  if (typeof data.company != 'string') {
    data.company = '';
  }

  if (typeof data.phone != 'string') {
    data.phone = '';
  }

  if (typeof data.email != 'string') {
    data.email = '';
  }

  if (typeof data.object != 'string') {
    data.object = '';
  }

  if (typeof data.message != 'string') {
    data.message = '';
  }

  const cleanedData = {
    surname: data.surname.trim(),
    name: data.name.trim(),
    company: data.company.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    object: data.object.trim(),
    message: data.message.trim(),
  };
  console.log(cleanedData);

  return cleanedData;
};

const isDataValid = (data) => {
  let isAllValid = false;

  const isSurnameValid = validator.isAlpha(data.surname, 'fr-FR', {
    ignore: ' -',
  });

  const isNameValid = validator.isAlpha(data.name, 'fr-FR', {
    ignore: ' -',
  });

  const isPhoneValid = validator.isMobilePhone(data.phone);

  const isEmailValid = validator.isEmail(data.email);

  if (isSurnameValid && isNameValid && isPhoneValid && isEmailValid) {
    isAllValid = true;
  }

  return isAllValid;
};

app.post('/api/sendMail', async (req, res) => {
  const body = req.body;

  const attachmentFiles = body.attachments.map((item) => {
    return {
      content: prepDataURL(item.url, item.type),
      filename: item.name.trim(),
      type: item.type,
      disposition: 'attachment',
    };
  });

  const cleanBody = cleanData(body);

  if (isDataValid(cleanBody)) {
    const msg = {
      to: 'bpardo@intemporalis.fr',
      from: 'contact-form@intemporalis.fr',
      subject: `INTEMPORALIS Contact Form: ${body.object}`,
      text: `
    Surname: ${body.surname}\n
    Name: ${body.name}\n
    Company: ${body.company}\n
    Phone: ${body.phone}\n
    Email: ${body.email}\n
    Subject: ${body.object}\n
    Message: ${body.message}\n
    `,
      attachments: attachmentFiles,
    };

    try {
      await sgMail.send(msg);
      console.log('mail was sent from backend');
      res.json('it worked');
    } catch (error) {
      console.log('error !!!!!!');
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    console.log('Validation error in the backend.');
    res.json('Validation error in the backend.');
  }
});

app.listen(port, () => {
  console.log(`Intemporalis app listening on port ${port}!`);
});
