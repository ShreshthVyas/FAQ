// FaqHindiDetails.tsx
import { useEffect, useState } from 'react';
import supabase from '@/utils/server';

export default function FaqHindiDetails({ id }: { id: number }) {
  const [faqHindi, setFaqHindi] = useState<any>(null);

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
  console.log(faqHindi.Answers);

  return (
    <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg text-white max-w-md">
      <h2 className="text-3xl font-bold mb-4">{faqHindi.Questions}</h2>
      {faqHindi.Answers && ( // Check if Answers is not null or undefined
    <p className="text-lg mb-2">Answer - {faqHindi.Answers}</p>
  )}
      Remarks - {faqHindi.Remarks}
      {faqHindi.Links && (
        <p className="text-green-500 mb-2">Follow-up - {faqHindi.Links}</p>
      )}
    </div>
  );
}
