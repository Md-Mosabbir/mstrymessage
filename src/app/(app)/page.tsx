import React from 'react'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from "@/messages.json"


const page = () => {
  return (
    <>
    <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-5xl font-bold'>Dive into the World of Anonymous Conversations</h1>

        <p className='mt-3 md:mt-4 text-base md:text-lg'>Explore Mystery Message - Where your identity remains a secret.</p>



      </section>

      <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {
          messages.map((message, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardHeader>
                  <h3>{message.title}</h3>
                </CardHeader>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <p className="text-lg font-semibold">{message.content}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    </main>

    {/* Footer */}
    <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
    © 2023 True Feedback. All rights reserved.
  </footer>

  </>
  )
}

export default page