
'use client'


import FaqDataDetails from "./FaqDataDetails";
import FaqHindiDetails from "./FaqHindiDetails";

export default function Details({ params }: { params: { id: number } }) {
  

  return (   
    <div className="flex flex-col mt-20 md:flex-row">
      <div className="xl:ml-100 md:ml-80 ml-4 mr-4">
        <FaqDataDetails id={params.id} />
      </div>
      <div className="mr-2 ml-4">
        <FaqHindiDetails id={params.id} />
      </div>
      {/* Back button */}
      
    </div> 
  );
}

