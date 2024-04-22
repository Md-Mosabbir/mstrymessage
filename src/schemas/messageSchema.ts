import {z} from 'zod';

export const MessageSchema = z.object({
    content: z.string().min(8, {message: "Message must be at least 8 character"}).max(300, {message: "Message must be no more than 300 characters"}),

}); 
