import { sendJobApplicationEmail } from '../services/email.service.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';

export const submitJobApplication = async (req, res, next) => {
  try {
    const { name, email, phone, portfolio, coverLetter, jobTitle, department } = req.body;
    const cvFile = req.file;

    if (!name || !email || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and cover letter / introduction are required.',
      });
    }

    let cvUrl = null;
    if (cvFile && cvFile.buffer) {
      try {
        cvUrl = await uploadBufferToCloudinary(cvFile.buffer, 'careers_cvs');
      } catch (uploadErr) {
        console.warn('⚠️ Cloudinary upload error for CV (continuing with email attachment):', uploadErr.message);
      }
    }

    // Send email notification to company & receipt to applicant
    sendJobApplicationEmail({
      name,
      email,
      phone,
      portfolio,
      coverLetter,
      jobTitle,
      department,
      cvFile,
      cvUrl,
    }).catch((err) => {
      console.error('Failed to send job application email notification:', err);
    });

    res.status(200).json({
      success: true,
      message: 'Your job application has been submitted successfully!',
      cvUrl,
    });
  } catch (error) {
    next(error);
  }
};
