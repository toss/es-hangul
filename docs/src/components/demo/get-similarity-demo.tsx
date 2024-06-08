import React, { useState } from 'react';
import { getSimilarity } from 'es-hangul';

export function GetSimilarityDemo() {
  const [searchWord, setSearchWord] = useState<string>('안녕하세요 저는 한글 라이브러리 입니다');
  const [userInput, setUserInput] = useState<string>('안연ㄹ허사ㅔ요 저는 허ㅏㄴㄴ글 라이바ㅡ러리 입ㄴ다');

  const result = getSimilarity(searchWord, userInput);

  return (
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto my-8">
      <div className="mb-4">
        <label htmlFor="searchWord" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Word
        </label>
        <input
          id="searchWord"
          type="text"
          placeholder="Enter search word"
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          User Input
        </label>
        <input
          id="userInput"
          type="text"
          placeholder="Enter user input"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
        />
      </div>
      <p className={`mt-4 text-lg ${result ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
        similarity: {result}
      </p>
    </div>
  );
}
