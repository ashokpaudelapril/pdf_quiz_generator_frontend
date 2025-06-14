// frontend/src/components/QuestionList.jsx
import React, { useState } from 'react';

const QuestionList = ({ questions }) => {
  // State to track which question's answer is revealed.
  // Using an object where keys are question indices and values are booleans.
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const handleRevealAnswer = (index) => {
    setRevealedAnswers(prevState => ({
      ...prevState,
      [index]: true // Set the answer for this specific question index as revealed
    }));
  };

  if (!questions || questions.length === 0) {
    return <p className="text-gray-600 text-center py-4">No questions to display. Try generating more questions or with different parameters.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Generated Quiz</h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-8 p-4 border border-gray-200 rounded-lg">
          <p className="text-lg font-semibold text-gray-800 mb-3">
            {index + 1}. {q.question}
          </p>

          {q.type === 'multiple_choice' && (
            <div className="space-y-2 mb-4">
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center">
                  <span className="text-gray-700">
                    {String.fromCharCode(65 + optIndex)}. {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {q.type === 'true_false' && (
            <div className="space-x-4 mb-4">
              <span className="text-gray-700">True</span>
              <span className="text-gray-700">False</span>
            </div>
          )}

          <button
            onClick={() => handleRevealAnswer(index)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={revealedAnswers[index]} // Disable button if answer is already revealed
          >
            {revealedAnswers[index] ? 'Answer Revealed' : 'Reveal Answer'}
          </button>

          {/* Display Answer and Explanation only if revealed */}
          {revealedAnswers[index] && (
            <>
              <div className="mt-4 p-3 bg-gray-50 border-l-4 border-blue-500 text-gray-800">
                <p className="font-bold">Correct Answer: <span className="text-blue-700">{q.answer}</span></p>
              </div>

              {/* --- NEW: Display Notes/Explanation --- */}
              {q.explanation && (
                <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-gray-800">
                  <p className="font-bold text-green-800">Explanation:</p>
                  <p className="text-gray-700">{q.explanation}</p>
                </div>
              )}
              {/* --- END NEW --- */}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;