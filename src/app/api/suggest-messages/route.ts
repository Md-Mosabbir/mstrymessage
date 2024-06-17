import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  try {

    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'. These questions are for an anonymous social messaging paltform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example: 'What's your favorite book and why?||What's the best advice you've ever received?||What's your dream vacation destination?'. Ensure the questins are intiguing, foster curiosity, and contribute to a positive and wecoming conversational enviroment."
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    max_tokens: 400,
    stream: true,
    prompt,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
    
  } catch (error) {

    if(error instanceof OpenAI.APIError) {
       
        const { name, status, headers, message } = error

        

        return NextResponse.json({ name, status, headers, message }, { status });
        
        


    } else {
        console.error("Error getting messages: ", error)
        throw error

    }
    
  }
}