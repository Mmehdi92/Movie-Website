import React from "react";

export default function ErrorAlert({ onError , errorMessage, errorTitle}) {
  return (
    <div className="fixed p-4 transform -translate-x-1/2 top-10 left-1/2 ">
      <div className="justify-between p-4 mx-auto border-l-4 border-red-500 rounded-md bg-red-50">
        <div className="flex items-start w-full gap-3">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="self-center flex-1">
            <span className="font-semibold text-red-600">{errorTitle}</span>
            <p className="mt-1 text-red-600">
              {errorMessage}
            </p>
          </div>
          <button
            className="text-red-500"
            onClick={() => {
              onError(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
