"use client";

import { FormEvent, useState } from "react";

// const isValidAmazonProductURL = (url: string) => {
//   try {
//     const parsedURL = new URL(url);
//     const hostname = parsedURL.hostname;

//     return hostname.includes("amazon.com") || hostname.includes("amazon.") || hostname.endsWith("amazon");
//   } catch (error) {
//     return false;
//   }
// };

const Searchbar = ({ onSearch }: { onSearch: (products: any[]) => void }) => {
  const [searchPrompt, SetSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const isValidLink = isValidAmazonProductURL(searchPrompt);

    // if (!isValidLink) return alert('Please provide a valid Amazon link');

    try {
      setIsLoading(true);

      const response = await fetch('/api/searchProducts', {  // Update this endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchPrompt })
      });

      const data = await response.json();

      if (data.products) {
        onSearch(data.products);  // Pass results to parent
      } else {
        console.error('No products found');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => SetSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button 
        type="submit" 
        className="searchbar-btn"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
