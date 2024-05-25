
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from 'next/link'


export default async function About () {
    
  
    return (
      <>
        <section className=" bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 ">
            <div className="wrapper w-full">
                <Image 
                    src="/assets/images/theresa-hero.png"
                    alt="hero"
                    width={2000}
                    height={2000}
                    className="w-full max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                />
                <div className="flex flex-col justify-center gap-8">
                    <h1 className="h1-bold">Your Journey to Fitness Starts Here!</h1>
                    <p className="">We believe that everyone has the potential to lead a healthier, happier life. Founded by a passionate fitness enthusiast, our bookstore is dedicated to providing top-quality resources that inspire and empower individuals to achieve their fitness goals.

                            Our cornerstone publication, "Fat to Fit: My Obesity, Overweight, and Diabetes," reflects our commitment to sharing real-life success stories and practical advice. This book is not just a guide; it's a testament to the strength of the human spirit and the power of perseverance.</p>
                    <p>
                    Our Mission

To empower individuals through education and inspiration, helping them lead healthier lives by providing access to the best fitness resources and success stories.

Meet the Author

Theresa, the mind behind "Fat to Fit: My Obesity, Overweight, and Diabetes," has been through an incredible journey of transformation. Once struggling with obesity and diabetes, [Author Name] has turned their life around and is now a beacon of hope for others facing similar challenges. Their story is one of resilience, determination, and the unwavering belief that anyone can achieve their fitness goals with the right support and guidance.

Why Choose Us?

Inspiring Stories: Real-life transformations that motivate and guide you.
Expert Advice: Practical tips and strategies from fitness experts.
Community Support: Join a community of like-minded individuals on the same journey.
Thank you for visiting [Bookstore Name]. We are excited to be a part of your fitness journey!     
                    </p>
                    <Button size="lg" asChild className="button w-full sm:w-fit">
                        <Link href="#books">
                        Explore Now
                        </Link>
                    </Button>
                </div>
  
            
            </div>
        </section> 
  
        
      </>
    )
  }
  