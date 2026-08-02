import { Contact } from '../models/index.js';
import { sendContactNotificationEmail } from '../services/email.service.js';

export const createContactSubmission = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.',
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification asynchronously
    sendContactNotificationEmail({ name, email, subject, message }).catch((err) => {
      console.error('Failed to send contact email notification:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Thank you!',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

