// FaqHindiDetails.tsx
import { useEffect, useState } from 'react';
import supabase from '@/utils/server';
import Link from 'next/link';

export default function FaqHindiDetails({ id }: { id: number }) {
  const [faqHindi, setFaqHindi] = useState<any>(null);

  const renderBold = (text: string): string => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    return text.replace(boldPattern, '<b>$1</b>');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('ID parameter is missing');
        }

        const { data, error } = await supabase
          .from('faqhindi')
          .select('*')
          .eq('id', id)
          .single();
          

        if (error) {
          throw new Error(error.message);
        }
        console.log('Fetched faqHindi data:', data);
        setFaqHindi(data || null);
      } catch (error:any) {
        console.error('Error fetching faqHindi:', error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!faqHindi) {
    return <div>Loading...</div>;
  }
  
  const remarklines = faqHindi.Remarks.split(';');

  return (
    <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg text-white max-w-md">
      <h2 className="text-3xl font-bold mb-4">{faqHindi.Questions}</h2>
      {faqHindi.Answers && ( // Check if Answers is not null or undefined
    <p className="text-lg mb-2">{faqHindi.Answers}</p>
  )}
      
      <p className='font-black'>अधिक जानकारी- </p>
      <div>
      {remarklines.map((line: string, index: number) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: line.trim() === "" ? "&nbsp;" : renderBold(line.trim()) }} />
      ))}
  </div>
      {faqHindi.Links && (
        <p className="text-blue-500 mb-2">
          <Link href={faqHindi.Links} target="_blank">
          {faqHindi.Links.includes('youtube') ? 'वीडियो देखने के लिए इस लिंक का उपयोग करिये' : 'और जानने के लिए इस लिक्न का चुनाव करे'}
          
          </Link>
          </p>
      )}
    </div>
  );
}
