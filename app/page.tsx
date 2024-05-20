'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

import supabase from "@/utils/server";

import {  useState } from 'react';

import { SparklesCore } from "@/components/ui/sparkles";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import  { SheetDemo } from "@/components/Sheet";

export default function Home() {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  
  const handleSearch = async () => {
    try {
      // Fetch data from 'faqData' table matching the search term in 'Questions' column
      const { data, error } = await supabase
        .from('faqData')
        .select('*')
        .textSearch('Questions', searchTerm, { type: 'websearch' })
        .limit(5);

      if (error) {
        throw new Error(error.message);
      }

      setSearchResults(data || []);
      if (!data || data.length === 0) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        // message gets narrowed to string!
        console.log(error.message);
      }
    }
  };

  const handleInputChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
  <main className="flex flex-col items-center justify-center h-screen  bg-black">
  
     <div className="h-[20rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="flex items-center">
      <img src="/cb1.png" alt="Icon" className="w-90 h-20 mr-3" />
      
      </div>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
 
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  <div className="flex flex-col items-center rounded-2xl ">
    <Input
      type="text"
      placeholder="Search your question..."
      value={searchTerm}
      onChange={handleInputChange}
      onKeyUp={handleKeyPress}
      className=" rounded-xl px-20 py-5 mb-4 border border-gray-300  focus:outline-none "
    />
    <Button onClick={handleSearch} className=" text-white rounded-xl mb-4 px-4 py-2 text-sm">Search</Button>
  </div>
  {/* {searchResults.length > 0 && (
    <ul className="mt-8">
      {searchResults.map((result, index) => (
        <li key={index}>
          <Link href={`/details/${result.id}`}>
            {result.Questions}
          </Link>
        </li>
      ))}
    </ul>
  )} */}
  <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={searchResults} />
    </div>
  <div>
  <SheetDemo />
  </div>
  {showPopup && (
        <div className="fixed flex items-center justify-center z-50 rounded-xl px-8">
        <div className=" flex flex-col items-center bg-blue-500 bg-opacity-500 p-8 rounded-xl shadow-md text-white text-center px-4 ">
          <p>Can not find what you are looking for? Our resources are constantly growing. </p>
            <p>Tell us your question through the feedback option and we will do our best to answer it within 48 hours.</p>
          <button onClick={handlePopupClose} className=" rounded-2xl mt-4 px-4 py-2 bg-white text-blue-500">Okay</button>
        </div>
      </div>
      )}
    </main>
  );
}
