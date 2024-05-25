import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { BookOpen } from 'lucide-react';

import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 mb-20 bg-white w-full border-b-2 border-gray-200 z-100">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-auto">
          <span className="flex-center space-x-2"><BookOpen className="text-green-700 size={64}" /><span className="p-bold-20 ">Theresa Eustace</span></span>
          
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>
        

        <div className="flex items-center w-auto justify-end gap-3">
        <Link href="/about" className="w-auto">
          About
          
        </Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header