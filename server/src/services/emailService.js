import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Send Welcome Email to newly registered user
 */
export const sendWelcomeEmail = async (email, name) => {
  if (!resend) {
    console.log(`[Email Service Standby] Welcome email triggered for ${email}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'SynapseCV <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to SynapseCV - Next-Gen AI Resume Engine',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b6cf6;">Welcome to SynapseCV, ${name}!</h2>
          <p>We are excited to have you on board. You can now build ATS-optimized resumes, enhance bullet points with Llama-3 AI, and run real-time ATS scoring audits.</p>
          <p>Get started by creating your first resume in your dashboard.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">SynapseCV Engine API • All Rights Reserved</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error.message);
  }
};

/**
 * Send Account Deletion Confirmation Email
 */
export const sendAccountDeletedEmail = async (email, name) => {
  if (!resend) {
    console.log(`[Email Service Standby] Account deletion email triggered for ${email}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'SynapseCV <support@resend.dev>',
      to: email,
      subject: 'Your SynapseCV Account Has Been Permanently Deleted',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #ef4444;">Account Permanently Deleted</h2>
          <p>Hi ${name},</p>
          <p>This is to confirm that your SynapseCV user account and all associated resume documents have been permanently removed from our databases.</p>
          <p>If you did not initiate this request, please contact our security team immediately.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send deletion email:', error.message);
  }
};

/**
 * Send Password Reset OTP Email
 */
export const sendPasswordResetOTPEmail = async (email, otp, name) => {
  if (!resend) {
    console.log(`[Email Service Standby] Password reset OTP for ${email}: ${otp}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'SynapseCV <security@resend.dev>',
      to: email,
      subject: 'Password Reset OTP - SynapseCV',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-radius: 12px;">
          <h2 style="color: #3b82f6;">Password Reset Request</h2>
          <p>Hi ${name || 'User'},</p>
          <p>You requested a password reset for your SynapseCV account. Use the OTP code below to verify your request:</p>
          <div style="background-color: #f1f5f9; padding: 16px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e293b;">${otp}</span>
          </div>
          <p style="font-size: 13px; color: #64748b;">This OTP code is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">SynapseCV Security Team • All Rights Reserved</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send password reset OTP email:', error.message);
  }
};

