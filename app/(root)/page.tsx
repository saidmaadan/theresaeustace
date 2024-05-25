import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllBooks } from '@/lib/actions/book.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const books = await getAllBooks({
    query: searchText,
    
    page,
    limit: 6
  })

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Your Journey to Fitness Starts Here!</h1>
            <p className="">Discover inspiring stories, expert advice, and transformative insights with our collection of fitness books. Whether you're looking to lose weight, manage diabetes, or simply lead a healthier lifestyle, we have the resources to help you achieve your goals. Our flagship title, "Fat to Fit: My Obesity, Overweight, and Diabetes," is a testament to the power of determination and the right guidance.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#books">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/theresa-home.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trust by <br /> Thousands of Clients</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={books?.data}
          emptyTitle="No books Found"
          emptyStateSubtext="Come back later"
          collectionType="All_books"
          limit={6}
          page={page}
          totalPages={books?.totalPages}
        />
      </section>
    </>
  )
}
