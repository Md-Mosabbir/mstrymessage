/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/ui/use-toast';
import { MessageSchema } from "@/schemas/messageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { AxiosError } from "axios"
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation"
import { useState } from "react"

import {  useForm } from "react-hook-form"
import * as z from "zod"
import { useCompletion } from '@ai-sdk/react';
import Link from "next/link";
import { Separator } from "@/components/ui/separator";


const initialMessageString =
"What's your favorite movie?||Do you have any pets?||What's your dream job?";

const formatSuggestion = (suggestion: string) => {
  return suggestion.split("||")
}
const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Extracting the user:
  const params  = useParams<{ username: string }>()
  const username = params.username

  const {toast} = useToast()

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema)
  })

  const messageContent = form.watch('content')

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsLoading(true)

    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username
      })

      toast({
        title: 'Success',
        description: response.data.message,
        variant: 'default'
      })
      form.reset( {...form.getValues(), content: ''})
      
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive'
      })
      
      
    } finally {
      setIsLoading(false)
    }    
    
  }

  // Handling Ai suggestions

  const { completion, complete, isLoading: isSuggestionLoading, error  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString
  })

  const fetchSuggestion = async () => {
    try {
      await complete('')
    } catch (error) {
      
      
      toast({
        title: 'Error',
        description: 'Failed to suggest message',
        variant: 'destructive'
      })
    }
  }

  
  



  const  submitMessage = (message: string) => {
    form.setValue('content', message)
  }

  return (
    <main className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl ">
      <h1 className="text-4xl font-bold mb-4 text-center">Send Anonymous Feedback</h1>
      <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button  type="submit" disabled= {isLoading}>{isLoading ? (<> <Loader2 className="mr-2 h4 w-4 animate-spin" /> Please wait </>) : ('Send Message')}</Button>
         
        </form>
      </Form>

      </section>
      <div className="space-y-4 my-16"></div>
      <section>
        {/* AI thingy */}

        <Button className="bg-violet-700" onClick={fetchSuggestion} disabled= {isSuggestionLoading}>{isSuggestionLoading ? <Loader2 className="mr-2 h4 w-4 animate-spin"/> : ("Suggest Messages") }</Button>
        <div className="space-y-2 my-4"></div>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Please select any of the suggested messages</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (<p>An Error occured</p>) : <p>{formatSuggestion(completion).map((mssg , index) => (
             
              <Button onClick={() => submitMessage(mssg)} className="w-full bg-white border text-black hover:text-white my-2" key={index}>{mssg}</Button>
              
            
            )) }</p>}
          </CardContent>
        </Card>

        
      </section>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    

      

    </main>
  )
}

export default page