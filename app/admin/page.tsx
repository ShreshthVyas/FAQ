'use client'
import { useState } from 'react';
import supabase from "@/utils/server";

const AdminForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [englishForm, setEnglishForm] = useState({
        id: '',
        Questions: '',
        Answers: '',
        Remarks: '',
        Links: '',
        Followup: ''
    });

    const [hindiForm, setHindiForm] = useState({
        id: '',
        Questions: '',
        Answers: '',
        Remarks: '',
        Links: ''
    });

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: any, tableName: string) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Insert data into Supabase
            const { data, error } = await supabase.from(tableName).insert(formData);

            if (error) {
                console.error('Error inserting data:', error.message);
                setSubmissionError(error.message);
            } else {
                console.log('Data inserted successfully:', data);
                // Clear form fields after successful submission
                if (tableName === 'faqData') {
                    resetForm(setEnglishForm);
                } else if (tableName === 'faqhindi') {
                    resetForm(setHindiForm);
                }
                setSubmissionError('');
            }
        } catch (error: any) {
            setSubmissionError(error.message);
            console.error('Error inserting data:', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = (setForm: Function) => {
        setForm({
            id: '',
            Questions: '',
            Answers: '',
            Remarks: '',
            Links: '',
            Followup: ''
        });
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
        <div className="max-w-2xl mx-auto mt-20">
            <form onSubmit={(e) => handleSubmit(e, englishForm, 'faqData')} className='bg-gray-800 rounded-md p-8 shadow-lg text-white mb-8'>
                {submissionError && (
                    <div className='text-red-500 mb-4'>{submissionError}</div>
                )}
                <h2 className='text-xl font-bold mb-4'>English Form</h2>
                <div className='mb-4'>
                    <label className='block text-white'>ID:</label>
                    <input type="number" value={englishForm.id} onChange={(e) => setEnglishForm({ ...englishForm, id: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Question (English):</label>
                    <input type="text" value={englishForm.Questions} onChange={(e) => setEnglishForm({ ...englishForm, Questions: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Answer (English):</label>
                    <input type="text" value={englishForm.Answers} onChange={(e) => setEnglishForm({ ...englishForm, Answers: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Remarks (English):</label>
                    <input type="text" value={englishForm.Remarks} onChange={(e) => setEnglishForm({ ...englishForm, Remarks: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Links (English):</label>
                    <input type="text" value={englishForm.Links} onChange={(e) => setEnglishForm({ ...englishForm, Links: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Follow-up (English):</label>
                    <input type="text" value={englishForm.Followup} onChange={(e) => setEnglishForm({ ...englishForm, Followup: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            <form onSubmit={(e) => handleSubmit(e, hindiForm, 'faqhindi')} className='bg-gray-800 rounded-md p-8 shadow-lg text-white'>
                {submissionError && (
                    <div className='text-red-500 mb-4'>{submissionError}</div>
                )}
                <h2 className='text-xl font-bold mb-4'>Hindi Form</h2>
                <div className='mb-4'>
                    <label className='block text-white'>ID:</label>
                    <input type="number" value={hindiForm.id} onChange={(e) => setHindiForm({ ...hindiForm, id: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Question (Hindi):</label>
                    <input type="text" value={hindiForm.Questions} onChange={(e) => setHindiForm({ ...hindiForm, Questions: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Answer (Hindi):</label>
                    <input type="text" value={hindiForm.Answers} onChange={(e) => setHindiForm({ ...hindiForm, Answers: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Remarks (Hindi):</label>
                    <input type="text" value={hindiForm.Remarks} onChange={(e) => setHindiForm({ ...hindiForm, Remarks: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <div className='mb-4'>
                    <label className='block text-white'>Links (Hindi):</label>
                    <input type="text" value={hindiForm.Links} onChange={(e) => setHindiForm({ ...hindiForm, Links: e.target.value })} className='block w-full bg-gray-700 text-white rounded-md p-2' />
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AdminForm;

