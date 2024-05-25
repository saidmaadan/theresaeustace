import Image from "next/image"
import Link from "next/link"
import { BookOpen } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <span className="flex-center space-x-2"><BookOpen className="text-green-700 size={64}"/><span className="p-bold-20 ">Theresa Eustace</span></span>
          {/* <Image 
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          /> */}
        </Link>

        <p>2024 Theresa Eustace. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer