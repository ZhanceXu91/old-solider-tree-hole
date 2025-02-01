import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1 w-full flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Carousel>
        <CarouselContent>
            <CarouselItem>
              <div className="w-[400px] h-48 bg-gray-300"></div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full h-48 bg-gray-300"></div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full h-48 bg-gray-300"></div>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    <div className="grid grid-cols-3 gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="w-24 h-24">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="w-24 h-24">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4">
        <div className="w-48 h-32 bg-gray-300"></div>
        <div className="w-48 h-32 bg-gray-300"></div>
        <div className="w-48 h-32 bg-gray-300"></div>
        <div className="w-48 h-32 bg-gray-300"></div>
        <div className="w-48 h-32 bg-gray-300"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
        <div className="w-[300px] h-32 bg-gray-200 mb-4"></div>
        <h3 className="text-lg font-semibold mb-2">Card Title {index + 1}</h3>
        <p className="text-gray-600">This is a description for card {index + 1}.</p>
      </div>
      ))}
    </div>
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
      <ul className="flex justify-around p-4">
        <li className="text-center">
          <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
        <div className="flex flex-col items-center">
          <Image src="/icons/order.svg" alt="Order Icon" width={24} height={24} />
          <span>选人下单</span>
        </div>
          </button>
        </li>
        <li className="text-center">
          <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
        <div className="flex flex-col items-center">
          <Image src="/icons/square.svg" alt="Square Icon" width={24} height={24} />
          <span>动态广场</span>
        </div>
          </button>
        </li>
        <li className="text-center">
          <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
        <div className="flex flex-col items-center">
          <Image src="/icons/profile.svg" alt="Profile Icon" width={24} height={24} />
          <span>个人中心</span>
        </div>
          </button>
        </li>
      </ul>
    </nav>
    </div>
  );
}
