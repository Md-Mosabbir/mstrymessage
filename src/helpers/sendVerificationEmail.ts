import { resend } from "@/lib/resend";
import VerificationEmails from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
  try {
    
    
    // error for dev account
    
    const emailSent = await resend.emails.send({
        from: "Mystery Message <onboarding@resend.dev>",
        to: [email],
        subject: "Verification code",
        react: VerificationEmails({username, otp: verifyCode}) 
        
    });
    

    if(emailSent.error){
      console.log("Error sending email", emailSent.error);
      
    }

    
    
    return {
      success: true,
      message: "Verification email sent"
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return{success: false, message: "Error sending verification email"}
  }
}


