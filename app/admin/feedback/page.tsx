'use client'
import { useEffect, useState } from 'react';
import supabase from '@/utils/server';

interface TableData {
  id: number;
  email: string;
  feedback: string;
  tag: string;
  resolved: boolean; // New column for resolved status
}

const Table = ({ data, handleCheckboxChange }: { data: TableData[], handleCheckboxChange: (id: number, checked: boolean) => void }) => {
  // Sort the data array based on id in descending order
  const sortedData = [...data].sort((a, b) => b.id - a.id);

  if (!sortedData || sortedData.length === 0) {
    return <div>No data available</div>;
  }
  
  return (
    <div className="overflow-x-auto mt-24">
  <table className="min-w-full divide-y divide-gray-200 bg-blue-100 bg-opacity-90 rounded-lg shadow-lg">
    <thead className="bg-blue-200">
      <tr>
        {/* Render headers for email, feedback, tag, and resolved */}
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Email
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Feedback
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Tag
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Resolved
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {sortedData.map((item, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-gray-100">
          {/* Render data cells for email, feedback, tag, and checkbox */}
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {item.email}
          </td>
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {item.feedback}
          </td>
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {item.tag}
          </td>
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            <input
              type="checkbox"
              checked={item.resolved}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default function SupabaseTable() {
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('fb').select('*');
        if (error) {
          throw error;
        }
        setTableData(data);
      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = async (id: number, checked: boolean) => {
    try {
      // Update the 'resolved' column in the database for the corresponding row
      const { data, error } = await supabase.from('fb').update({ resolved: checked }).eq('id', id);
      if (error) {
        throw error;
      }
      // Update the local state to reflect the change
      setTableData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, resolved: checked } : item
        )
      );
    } catch (error:any) {
      console.error('Error updating data:', error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-20">Feedback Table</h1>
      <Table data={tableData} handleCheckboxChange={handleCheckboxChange} />
    </div>
  );
}
