import React from "react";

export default function SuccesAlert({ onSucces, succesTitle, succesMessage}) {
  return (
    <div className="fixed p-4 transform -translate-x-1/2 select-none top-10 left-1/2 ">
      <div className="justify-between p-4 mx-auto border border-green-300 rounded-md bg-green-50">
        <div className="flex items-start w-full gap-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="self-center flex-1">
            <span className="font-medium text-green-600">
             {succesTitle}
            </span>
            <div className="text-green-600">
              <p className="mt-2 sm:text-sm">
               {succesMessage}
              </p>
                {/* <div className="mt-2">
                  <a
                    href="javascript:void(0)"
                    className="inline-flex items-center font-medium hover:underline sm:text-sm"
                  >
                    Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div> */}
            </div>
          </div>
          <button
            className=""
            onClick={() => {
              onSucces(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
