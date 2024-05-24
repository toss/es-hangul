import React, { useState } from 'react';
import { chosungIncludes } from 'es-hangul';

export function ChosungIncludesDemo() {
  const [searchWord, setSearchWord] = useState<string>('홍길동');
  const [userInput, setUserInput] = useState<string>('ㅎㄱㄷ');

  const result = chosungIncludes(searchWord, userInput);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto my-8">
      <div className="mb-4">
        <label htmlFor="searchWord" className="block text-sm font-medium text-gray-700 mb-2">
          Search Word
        </label>
        <input
          id="searchWord"
          type="text"
          placeholder="Enter search word"
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 mb-2">
          User Input
        </label>
        <input
          id="userInput"
          type="text"
          placeholder="Enter user input"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p className={`mt-4 text-lg ${result ? 'text-green-500' : 'text-red-500'}`}>
        Result: {result ? 'Match found' : 'No match'}
      </p>
    </div>
  );
}
