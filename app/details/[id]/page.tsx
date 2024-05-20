
'use client'

import { useRouter , useSearchParams } from 'next/navigation';
import FaqDataDetails from "./FaqDataDetails";
import FaqHindiDetails from "./FaqHindiDetails";

export default function Details({ params }: { params: { id: number } }) {
  const router = useRouter();
  const sp = useSearchParams().get('originalPathname');

  // Function to handle back button click
  const handleBackButtonClick = () => {
    console.log(sp as string);
    // Navigate back to the homepage with the original search URL
    // router.push(sp as string);
  };

  return (   
    <div className="flex flex-col mt-20 md:flex-row">
      <div className="xl:ml-100 md:ml-80 ml-4 mr-4">
        <FaqDataDetails id={params.id} />
      </div>
      <div className="mr-2 ml-4">
        <FaqHindiDetails id={params.id} />
      </div>
      {/* Back button */}
      <button onClick={handleBackButtonClick} className="fixed mt-20 top-4 left-4 z-10 bg-white text-gray-800 px-4 py-2 rounded-md shadow">Back</button>
    </div> 
  );
}

