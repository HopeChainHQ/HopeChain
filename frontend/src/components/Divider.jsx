import React from "react";

const Divider = ({ text }) => {
  return (
    <div className="relative my-8 md:my-12 lg:my-16">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 text-base font-semibold leading-6 text-gray-900 bg-white">
          {text}
        </span>
      </div>
    </div>
  );
};

export default Divider;
