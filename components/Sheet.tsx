'use client';

import { Button } from "@/components/ui/button";
import { useState } from 'react';
import supabase from "@/utils/server";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paragraph: '',
    option: 'Could not find question', // Default value for the dropdown
    agree: false, // Default value for the agreement
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e:any) => {
    setFormData({
      ...formData,
      agree: e.target.checked,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Please agree to the terms before submitting.');
      return;
    }
    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.paragraph || !formData.option) {
      alert('Please fill in all the required fields.');
      return;
    }

    try {
      const { data, error } = await supabase.from('fb').insert([
        {
          name: formData.name,
          email: formData.email,
          feedback: formData.paragraph,
          tag: formData.option,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Feedback submitted successfully:', data);
      // Reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        paragraph: '',
        option: 'Could not find question',
        agree: false,
      });
      setSubmitted(true);
    } catch (error:any) {
      console.error('Error submitting feedback:', error.message);
    }
  };

  const handleSheetClose = () => {
    setSubmitted(false);
  };

  return (
    <Sheet onOpenChange={handleSheetClose}>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white fixed bottom-4 right-4 z-50 font-bold py-2 px-4 rounded-full focus:outline-none">Feedback?</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Share your feedback/question to us.</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div>
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-green-500 font-bold">Thank you for your feedback.We will respond shortly.</p>
              <SheetClose asChild>
                <Button className="mt-4">Close</Button>
              </SheetClose>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
              {/* Name input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-100">Name<span className="text-red-500">*</span>:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="text-black mt-1 block w-full shadow-sm py-1 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>

              {/* Email input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email<span className="text-red-500">*</span>:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="text-black mt-1 block w-full shadow-sm py-1 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
              {/* Dropdown */}
              <div className="mb-4">
                <label htmlFor="dropdown" className="block text-sm font-medium text-gray-100">Select an option<span className="text-red-500">*</span>:</label>
                <select
                  id="dropdown"
                  name="option"
                  value={formData.option}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                >
                  <option value="Could not find question">Question is not available on the website?</option>
                  <option value="Feedback / Suggestion">I have a Feedback/Suggestion</option>
                  <option value="Further enquiry related any question ?">My question is available, but I want more clarity</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Input paragraph */}
              <div className="mb-4">
                <label htmlFor="paragraph" className="block text-sm font-medium text-gray-100">Please type in your feedback/question<span className="text-red-500">*</span>:</label>
                <textarea
                  id="paragraph"
                  name="paragraph"
                  value={formData.paragraph}
                  required
                  onChange={handleChange}
                  placeholder=""
                  className="text-black mt-1 py-4 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                ></textarea>
              </div>

              {/* Agreement checkbox */}
              <div className="mb-4">
                <label htmlFor="agree" className="block text-sm font-medium text-gray-200">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleCheckboxChange}
                    className="mb-auto"
                    required
                  />
                  By clicking here you agree to share your information with us. Some account and system information may be sent to us. We will use to fix problems and improve our services. We may email you with more information or updates.
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="rounded-xl bottom-4 w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          )}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            {/* <Button className="mt-4">Close</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
