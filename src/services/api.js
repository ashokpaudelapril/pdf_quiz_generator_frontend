import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const generateContent = async (pdfFile, count, questionType, contentType) => {
  const formData = new FormData();
  formData.append('file', pdfFile); // ✅ Must match backend param name

  let endpoint = '';
  if (contentType === 'quiz') {
    formData.append('num_questions', count);
    formData.append('question_type', questionType);
    endpoint = '/generate-quiz/';
  } else if (contentType === 'vocabulary') {
    formData.append('num_words', count);
    endpoint = '/extract-vocabulary/';
  } else if (contentType === 'summary') {
    formData.append('num_sentences', count);
    endpoint = '/summarize-text/';
  } else {
    throw new Error('Invalid content type specified.');
  }

  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`API Error during ${contentType} generation:`, error.response?.data || error.message);
    throw error;
  }
};
