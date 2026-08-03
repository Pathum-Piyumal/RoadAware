import { Contact } from '../models/index.js';
import { sendContactNotificationEmail, sendSupportDeskInquiryEmail } from '../services/email.service.js';

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

export const createSupportTicketSubmission = async (req, res, next) => {
  try {
    const { name, email, category, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    const ticketId = `RA-${Math.floor(Math.random() * 9000) + 1000}`;

    // Log contact entry in database if possible
    try {
      await Contact.create({
        name,
        email,
        subject: `[Support Desk #${ticketId}] ${category || 'General Inquiry'}`,
        message: `[Category: ${category || 'General Inquiry'}]\n\n${message}`,
      });
    } catch (dbErr) {
      console.warn('⚠️ Could not save support ticket to DB:', dbErr.message);
    }

    // Send support desk inquiry email notification via Brevo API
    sendSupportDeskInquiryEmail({
      name,
      email,
      category: category || 'General Inquiry',
      message,
      ticketId,
    }).catch((err) => {
      console.error('Failed to send support ticket email:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Support ticket submitted successfully.',
      ticketId,
    });
  } catch (error) {
    next(error);
  }
};
