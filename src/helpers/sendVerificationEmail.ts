import { resend } from "@/lib/resend";
import VerificationEmails from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email: string, username: string, otp: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
        from: "onboarding@gmail.com",
        to: email,
        subject: "Verification code",
        react: VerificationEmails({username, otp}) 
        
    });
    
    return {
      success: true,
      message: "Verification email sent"
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return{success: false, message: "Error sending verification email"}
  }
}


