import React from "react";
import { Button } from "../ui/button";
import { BannerProps } from "@/types/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
export default function Banner({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}: BannerProps) {
  return (
      <section
        className={cn(
          "w-full h-full bg-no-repeat bg-center lg:bg-left object-fit bg-cover",
          image
        )}
      >
        <div className="container lg:px-16 md:px-8 px-4 grid grid-cols-12 lg:py-0 py-5">
          <div className="col-span-full md:col-span-9 lg:col-span-7 flex flex-col space-y-5">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold hit-the-floor">
              {title}
            </h1>
            <p className="text-white w-2/3">{description}</p>
            <Link href={buttonLink}>
              <Button className="md:w-1/3 w-1/2 md:text-base text-sm bg-[#723E1E] text-white hover:bg-[#935027] font-bold py-5 rounded">
                {buttonText} <ShoppingCart   size={30} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
  );
}
