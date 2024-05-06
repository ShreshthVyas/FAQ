'use client'
import { useEffect, useState } from 'react';
import supabase from '@/utils/server';

export default function FaqDataDetails({ id }: { id: number }) {
  const [faqData, setFaqData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('ID parameter is missing');
        }

        const { data, error } = await supabase
          .from('faqData')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setFaqData(data || null);
      } catch (error:any) {
        console.error('Error fetching faqData:', error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!faqData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg text-white max-w-md">
      <h2 className="text-3xl font-bold mb-4">{faqData.Questions}</h2>
      <p className="text-lg mb-2">Answer - {faqData.Answers}</p>
      Remarks- {faqData.Remarks}
      {faqData.Links && (
        <p className="text-blue-500 mb-2">Follow-up - {faqData.Links}</p>
      )}
      {faqData.Followup && (
        <p className="text-green-500 mb-2">Follow-up - {faqData.Followup}</p>
      )}
    </div>
  );
}
