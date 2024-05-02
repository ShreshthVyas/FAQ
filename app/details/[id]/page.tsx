
'use client'
// Assuming this code snippet is within a larger component where the navbar is rendered

// Assuming this code snippet is within a larger component where the navbar is rendered

import { useEffect, useState } from 'react';
import supabase from '@/utils/server';
import { motion } from 'framer-motion';

export default function Details({ params }: { params: { id: number } }) {
  const [rowData, setRowData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = params.id;
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

        setRowData(data || null);
      } catch (error:any) {
        console.error('Error fetching row data:', error.message);
      }
    };

    fetchData();
  }, [params]);

  if (!rowData) {
    return <div>Loading...</div>;
  }

  let remarksLines = rowData.Remarks.split(';');

  return (
    <div className="relative">
      <div className="absolute top-20 left-60">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg text-white max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">{rowData.Questions}</h2>
            <p className="text-lg mb-2">Answer - {rowData.Answers}</p>
            Remarks-
            {remarksLines.map((line:string, index:number) => (
              <p key={index}>{line}</p>
            ))}
            {rowData.Links && (
              <p className="text-green-500 mb-2">Follow-up - {rowData.Links}</p>
            )}
            {rowData.Followup && (
              <p className="text-green-500 mb-2">Follow-up - {rowData.Followup}</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
