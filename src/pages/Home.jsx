// frontend/src/pages/Home.jsx
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload.jsx';
import QuestionList from '../components/QuestionList.jsx'; // This will contain the quiz logic
import VocabList from '../components/VocabList.jsx';
import { generateContent } from '../services/api.js'; // Unified API call service

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  const [summary, setSummary] = useState('');
  // --- NEW STATE FOR QUIZ SPECIFIC NOTES/SUMMARY ---
  const [quizNotes, setQuizNotes] = useState('');
  // --- END NEW STATE ---
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [numVocabularyWords, setNumVocabularyWords] = useState(10);
  const [numSummarySentences, setNumSummarySentences] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (contentType) => {
    if (!selectedFile) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Clear ALL results first when a new generation request is made
    setQuestions([]);
    setVocabulary([]);
    setSummary('');
    


    try {
      let result;
      if (contentType === 'quiz') {
        result = await generateContent(selectedFile, numQuestions, questionType, 'quiz');
        setQuestions(result.questions);
      } else if (contentType === 'vocabulary') {
        result = await generateContent(selectedFile, numVocabularyWords, null, 'vocabulary');
        setVocabulary(result.vocabulary);
      } else if (contentType === 'summary') {
        result = await generateContent(selectedFile, numSummarySentences, null, 'summary');
        setSummary(result.summary);
      }
      
    } catch (err) {
      console.error(`API Error during ${contentType} generation:`, err);
      setError(err.response?.data?.detail || err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="text-center my-8">
        <h1 className="text-4xl font-extrabold text-gray-900">PDF Study Tool</h1>
        <p className="text-lg text-gray-600 mt-2">
          Upload a PDF to generate quizzes, extract vocabulary, or get summaries!
        </p>
      </header>

      {/* FileUpload Component */}
      <FileUpload
        onFileSelect={setSelectedFile}
        numQuestions={numQuestions}
        onNumQuestionsChange={setNumQuestions}
        questionType={questionType}
        onQuestionTypeChange={setQuestionType}
        numVocabularyWords={numVocabularyWords}
        onNumVocabularyWordsChange={setNumVocabularyWords}
        numSummarySentences={numSummarySentences}
        onNumSummarySentencesChange={setNumSummarySentences}
        onGenerate={handleGenerate} 
        isLoading={isLoading}
        selectedFile={selectedFile}
      />

      {/* Error Message Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Loading Message Display */}
      {isLoading && (selectedFile && questions.length === 0 && vocabulary.length === 0 && !summary && !quizNotes) && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">Generating content... This might take a moment.</span>
        </div>
      )}

      {/* --- NEW: Quiz Notes/Description Display --- */}
      {!isLoading && quizNotes && (
        <div className="bg-white shadow rounded-lg p-6 mb-6 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes for Quiz</h2>
          <p className="text-gray-700 leading-relaxed">{quizNotes}</p>
        </div>
      )}
      {/* --- END NEW QUIZ NOTES --- */}

      {/* Quiz Questions Display */}
      {!isLoading && questions.length > 0 && (
        <QuestionList questions={questions} />
      )}

      {/* Vocabulary List Display */}
      {!isLoading && vocabulary.length > 0 && (
        <VocabList vocabulary={vocabulary} />
      )}

      {/* Summary Display (for dedicated summary generation) */}
      {!isLoading && summary && (
        <div className="bg-white shadow rounded-lg p-6 mb-6 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Text Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Initial/No Result Message */}
      {!isLoading && !error && questions.length === 0 && vocabulary.length === 0 && !summary && !quizNotes && selectedFile && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">Click one of the 'Generate' buttons to see results here!</span>
          </div>
      )}
       {!isLoading && !error && !selectedFile && (
          <div className="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">Upload a PDF to get started.</span>
          </div>
      )}
    </div>
  );
};

export default Home;