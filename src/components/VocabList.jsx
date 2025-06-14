// frontend/src/components/VocabList.jsx
import React from 'react';

const VocabList = ({ vocabulary }) => {
  if (!vocabulary || vocabulary.length === 0) {
    return null; // Don't render if no vocabulary
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6 text-left">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Extracted Vocabulary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocabulary.map((item, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.word} <span className="text-sm text-gray-600">({item.part_of_speech})</span></h3>
            <p className="text-gray-700 text-sm">{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabList;