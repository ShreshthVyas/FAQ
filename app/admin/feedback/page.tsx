'use client'
import { useEffect, useState } from 'react';
import supabase from '@/utils/server';

interface TableData {
  // Define properties based on the structure of your data
  // For example:
  id: number;
  email: string;
  feedback: string;
  tag: string;
}

const Table = ({ data }: { data: TableData[] }) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
      }
  return (
    <div className="overflow-x-auto mt-24">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(data[0]).map((key, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(item).map((value, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {value}
                </td>
              ))}
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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Table</h1>
      <Table data={tableData} />
    </div>
  );
}
