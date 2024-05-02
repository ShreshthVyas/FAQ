import { useState } from 'react';

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleOpen = () => {
    setOpen(prevState => !prevState);
    setTimeout(() => {
      setEmail("");
      setMessage("");
      setRating(0);
      setSubmitted(false);
    }, 200);
  };

  const encode = (data: { [key: string]: any }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "feedback", email, message, rating })
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <div className="bg-blue-500 hover:bg-blue-600 text-white fixed bottom-4 right-4 z-50 font-bold py-2 px-4 rounded-full focus:outline-none" onClick={toggleOpen}>
        Feedback ?
      </div>
      <div className={`${open ? "opacity-100" : "opacity-0"} transition-opacity duration-200 flex flex-col justify-center fixed w-11/12 bottom-20 sm:bottom-20 sm:right-20 z-50 px-6 py-7 rounded-md bg-gray-700 shadow-lg sm:w-72`}>
        {submitted ? (
          <div className={`h-64 flex flex-col justify-between`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 self-center" fill="none" viewBox="0 0 24 24" stroke="#34d399">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white font-semibold text-lg">Thank you for submitting your question!</p>
            <p className="text-white">We will reach out to you shortly.</p>
          </div>
        ) : (
          <div>
            <p className="font-semibold mb-5 text-lg text-white flex flex-row">
              We would love your feedback!
            </p>
            <form onSubmit={onSubmit} className="space-y-10 sm:space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                <div className="mt-1">
                  <input className="text-slate-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-2 h-9" value={email} name="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="rating" className="block text-sm font-medium text-white">Couldn't find your question?</label>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-white">Write your question here:</label>
                <div className="mt-1">
                  <textarea value={message} id="message" name="message" rows={4} className=" text-slate-900 py-2 px-3 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md resize-none" onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
              </div>
              <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Feedback;
