
'use client'
import { useState } from 'react';
import supabase from "@/utils/server";

const AdminForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Questions, setQuestion] = useState('');
  const [Answers, setAnswer] = useState('');
  const [Remarks, setRemarks] = useState('');
  const [Links, setLinks] = useState('');
  const [Followup, setFollowup] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === 'paarth' && password === 'atharv') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Insert data into Supabase
      const { data, error } = await supabase.from('faqData').insert(
        { Questions, Answers, Remarks,Links ,Followup }
      );

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        
        console.log('Data inserted successfully:', data);
        // Clear form fields after successful submission
        setQuestion('');
        setAnswer('');
        setRemarks('');
        setLinks('');
        setFollowup('');
        setSubmissionError('');
      }
    } catch (error:any) {
        setSubmissionError(error.message);
      console.error('Error inserting data:', error.message);
    }
    finally {
        setSubmitting(false);
      }
  };

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLogin} className='bg-gray-800 rounded-md p-8 shadow-lg max-w-lg mx-auto mt-24'>
        <div className='mb-4'>
          <label className='block text-white'>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='block w-full bg-gray-700 text-white rounded-md p-2' />
        </div>
        <div className='mb-4'>
          <label className='block text-white'>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='block w-full bg-gray-700 text-white rounded-md p-2' />
        </div>
        <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'>
          Login
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='bg-gray-800 rounded-md p-8 shadow-lg max-w-lg mx-auto mt-20'>
        {submissionError && (
        <div className='text-red-500 mb-4'>{submissionError}</div>
      )}
    <div className='mb-4'>
      <label className='block text-white'>Question:</label>
      <input type="text" value={Questions} onChange={(e) => setQuestion(e.target.value)} className='block w-full bg-gray-700 text-white rounded-md p-2' />
    </div>
    <div className='mb-4'>
      <label className='block text-white'>Answer:</label>
      <input type="text" value={Answers} onChange={(e) => setAnswer(e.target.value)} className='block w-full bg-gray-700 text-white rounded-md p-2' />
    </div>
    <div className='mb-4'>
      <label className='block text-white'>Remarks:</label>
      <input type="text" value={Remarks} onChange={(e) => setRemarks(e.target.value)} className='block w-full bg-gray-700 text-white rounded-md p-2' />
    </div>
    <div className='mb-4'>
      <label className='block text-white'>Links:</label>
      <input type="text" value={Links} onChange={(e) => setLinks(e.target.value)} className='block w-full bg-gray-700 text-white rounded-md p-2' />
    </div>
    <div className='mb-4'>
      <label className='block text-white'>Follow-up:</label>
      <input type="text" value={Followup} onChange={(e) => setFollowup(e.target.value)} className='block w-full bg-gray-700 text-white rounded-md p-2' />
    </div>
    <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'>
    {submitting ? 'Submitting...' : 'Submit'}
    </button>
  </form>
  );
};

export default AdminForm;
