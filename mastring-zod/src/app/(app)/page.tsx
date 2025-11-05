"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import message from "@/message.json";

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {message.map((m, i) => (
              <CarouselItem key={i}>
                <div className="p-5">
                  <Card>
                    <CardHeader>
                      <CardTitle>{m.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <p className="text-3xl font-bold text-center line-clamp-3">
                        {m.content}
                      </p>
                    </CardContent>
                    <CardFooter>{m.received}</CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="bg-gray-800 p-4 md:p-6 text-white text-center w-full">© 2025 True Feedback. All rights reserved.</footer>
    </>
  );
}
