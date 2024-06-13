/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Button } from "@/components/ui/button"
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

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Extracting the user:
  const params  = useParams<{ username: string }>()
  const username = params.username

  const {toast} = useToast()

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema)
  })

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
      form.reset( {content: ''})
      
      
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
  



  return (
    <main className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl ">
      <h1 className="text-4xl font-bold mb-4 text-center">Send Anonymous Feedback</h1>
      <div>
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

      </div>

    </main>
  )
}

export default page