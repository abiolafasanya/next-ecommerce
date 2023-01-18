import React from 'react';

const Search = () => {
  return (
    <div className="sm:hidden flex">
      <input type="search" className="lg:w-[350px] inline-block focus:outline-none px-3 placeholder:text-sm" 
      placeholder='search product, brand and category'
      />
      <button className="py-3 px-5 rounded-sm text-sm bg-yellow-500">Search</button>
    </div>
  );
};

export default Search;
