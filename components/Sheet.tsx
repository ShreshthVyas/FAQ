'use client'
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/sheet"



export function SheetDemo() {

    const [formData, setFormData] = useState({
        email: '',
        paragraph: '',
        option: 'Could not find question ', // Default value for the dropdown
      });
      const [submitted, setSubmitted] = useState(false);
    
      const handleChange = (e:any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        try {
          const { data, error } = await supabase.from('fb').insert([
            {
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
            email: '',
            paragraph: '',
            option: '',
          });
          setSubmitted(true);
        } catch (error:any) {
          console.error('Error submitting feedback:', error.message);
        }
      };
      

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className= " roulded-xl bg-blue-500 hover:bg-blue-600 text-white fixed bottom-4 right-4 z-50 font-bold py-2 px-4 rounded-full focus:outline-none">Feedback?</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>We would love your feedback !</SheetTitle>
          <SheetDescription>
            Could'nt find your question or any other query ?
            Please mention below.
          </SheetDescription>
        </SheetHeader>
        
  {/* Dropdown */}
  <div>
  <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      {/* Dropdown */}
      <div className="mb-4">
        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-100">
          Select an option:
        </label>
        <select
          id="dropdown"
          name="option"
          value={formData.option}
          onChange={handleChange}
          className="  mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        >
          <option value="Couldn't find your Question !">Couldn't find your Question !</option>
          <option value="Feedback / Suggestion">Feedback / Suggestion</option>
          <option value="Further enquiry related any question ?">Further enquiry related any question ?</option>
        </select>
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-100">
          Email:
        </label>
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

      {/* Input paragraph */}
      <div className="mb-4">
        <label htmlFor="paragraph" className="block text-sm font-medium text-gray-100">
          Input Paragraph:
        </label>
        <textarea
          id="paragraph"
          name="paragraph"
          value={formData.paragraph}
          onChange={handleChange}
          placeholder="Enter your paragraph"
          className=" text-black mt-1 py-4 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        ></textarea>
      </div>

      {/* Submit button */}
      <button
              type="submit"
              className="rounded-xl w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
      
    </form>
    
    </div>


        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Close</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
