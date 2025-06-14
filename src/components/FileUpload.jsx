// frontend/src/components/FileUpload.jsx
import React from 'react';

const FileUpload = ({
  onFileSelect,
  numQuestions,
  onNumQuestionsChange,
  questionType,
  onQuestionTypeChange,
  numVocabularyWords,
  onNumVocabularyWordsChange,
  numSummarySentences,
  onNumSummarySentencesChange,
  onGenerate, // Unified handler for generating content
  isLoading,
  selectedFile
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload PDF & Configure</h2>

      <div className="mb-4">
        <label htmlFor="pdf-upload" className="block text-gray-700 text-sm font-bold mb-2">
          Select PDF File:
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={(e) => onFileSelect(e.target.files[0])}
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={isLoading}
        />
         {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">Selected: <span className="font-semibold">{selectedFile.name}</span></p>
        )}
      </div>

      <hr className="my-6 border-t border-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quiz Options */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Generate Quiz</h3>
          <div className="mb-4">
            <label htmlFor="num-questions" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Questions:
            </label>
            <input
              id="num-questions"
              type="number"
              value={numQuestions}
              onChange={(e) => onNumQuestionsChange(parseInt(e.target.value))}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="question-type" className="block text-gray-700 text-sm font-bold mb-2">
              Question Type:
            </label>
            <select
              id="question-type"
              value={questionType}
              onChange={(e) => onQuestionTypeChange(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="short_answer">Short Answer</option>
              <option value="true_false">True/False</option>
            </select>
          </div>
          <button
            onClick={() => onGenerate('quiz')}
            disabled={isLoading || !selectedFile}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedFile && onGenerate === 'quiz' ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
        </div>

        {/* Vocabulary Options */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Extract Vocabulary</h3>
          <div className="mb-4">
            <label htmlFor="num-vocab-words" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Words:
            </label>
            <input
              id="num-vocab-words"
              type="number"
              value={numVocabularyWords}
              onChange={(e) => onNumVocabularyWordsChange(parseInt(e.target.value))}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={() => onGenerate('vocabulary')}
            disabled={isLoading || !selectedFile}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {isLoading && selectedFile && onGenerate === 'vocabulary' ? 'Extracting Vocab...' : 'Extract Vocabulary'}
          </button>
        </div>
      </div> {/* End grid */}

      {/* Summary Options */}
      <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Summarize Text</h3>
          <div className="mb-4">
            <label htmlFor="num-summary-sentences" className="block text-gray-700 text-sm font-bold mb-2">
              Number of Sentences:
            </label>
            <input
              id="num-summary-sentences"
              type="number"
              value={numSummarySentences}
              onChange={(e) => onNumSummarySentencesChange(parseInt(e.target.value))}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={() => onGenerate('summary')}
            disabled={isLoading || !selectedFile}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedFile && onGenerate === 'summary' ? 'Summarizing...' : 'Summarize Text'}
          </button>
      </div>

    </div>
  );
};

export default FileUpload;