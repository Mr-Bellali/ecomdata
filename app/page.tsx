"use client";

import { useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Products from "@/components/Products";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);

  return (
    <>
      <section className="px-6 md:px-20 py-24 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Save Your money from here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> EcomData</span>
            </h1>
            <p className="mt-6">
              Self-serve product and growth analytics to help you obtain and engage more
            </p>
            <Searchbar onSearch={setProducts} />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <Products products={products} />
      </section>
    </>
  );
};

export default Home;
