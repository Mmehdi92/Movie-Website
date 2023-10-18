import React from "react";

export default function ContactForm() {
  return (
    <div className="py-2 px-4  mx-auto max-w-6xl ">
      <p className="mb-4 font-light text-center text-lg  text-gray-500 sm:-text-xl">
        Got an issue ? Want to sned feedback? Need details about the project?
      </p>
      <form action="#">
        <div className="flex flex-row">
          <div className="w-1/2 pr-2 ">
            <label
              for="firstName"
              className="block my-2 text-left  
                                          text-lg font-medium text-gray-500"
            >
              First Name
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border 
                                          border-gray-300 text-gray-500  
                                          text-lg rounded-lg block w-full p-2.5"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              for="firstName"
              className="block my-2 text-left text-lg  
                                          font-medium text-gray-500"
            >
              Last Name
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border  
                                          border-gray-300 text-gray-500  
                                          text-lg rounded-lg block w-full p-2.5"
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div>
          <label
            for="email"
            className="block my-2 text-left text-lg  
                                      font-medium text-gray-500"
          >
            Your email
          </label>
          <input
            type="email"
            className="shadow-sm bg-gray-50 border  
                                      border-gray-300 text-gray-500  
                                      text-lg rounded-lg block w-full p-2.5"
            placeholder="youremail@.mehdi.com"
            required
          />
        </div>
        <div>
          <label
            for="subject"
            className="block my-2 text-left  
                                      text-lg font-medium text-gray-500"
          >
            Subject
          </label>
          <input
            type="text"
            className="block p-3 w-full text-lg  
                                      text-gray-500 bg-gray-50 rounded-lg  
                                      border border-gray-300 shadow-sm "
            placeholder="What issue/suggestion do you have?"
            required
          />
        </div>
        <div>
          <label
            for="message"
            className="block my-2 text-left  
                                      text-lg font-medium text-gray-500 "
          >
            Your message
          </label>
          <textarea
            rows="6"
            className="block p-2.5 w-full text-lg  place- 
                                         text-gray-700 bg-gray-50 rounded-lg  
                                         shadow-sm border border-gray-300 "
            placeholder="Message..."
          />
        </div>
        <div className="mx-auto flex sm:justify-end  justify-center sm:items-end items-center">
          <button
            type="submit"
            className="  mt-2  mb-2 p-2   dark:text-white text-black font-semibold
          rounded-lg bg-amber-500 hover:scale-110"
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  );
}
