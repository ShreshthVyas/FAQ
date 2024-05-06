
'use client'

import FaqDataDetails from "./FaqDataDetails";
import FaqHindiDetails from "./FaqHindiDetails";



export default function Details({ params }: { params: { id: number } }) {
    return (   
      <div className="flex flex-col  mt-20 md:flex-row  ">
         <div className="md:ml-80 ml-4">
        <FaqDataDetails id={params.id} />
      </div>
          <FaqHindiDetails id={params.id} />
      </div> 
  );
}
