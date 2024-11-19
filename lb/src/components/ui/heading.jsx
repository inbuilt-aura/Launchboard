import React from 'react';


const Heading = ({ text }) => {
  return (
    <h2 className="font-bricolage text-2xl mb-2 md:text-4xl font-bold text-absoluteDark">
      {text}
    </h2>
  );
};

export default Heading