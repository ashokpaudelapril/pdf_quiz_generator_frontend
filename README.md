# PDF Quiz Generator Frontend

This is the frontend for the PDF Quiz Generator project. It provides a user-friendly interface to upload PDF files, generate quizzes, extract vocabulary, and summarize text using the backend API.

## Features

- **PDF Upload:** Upload PDF files for processing.
- **Quiz Generation:** View multiple-choice and true/false questions generated from PDF content.
- **Vocabulary Extraction:** Display key vocabulary words with definitions and parts of speech.
- **Text Summarization:** Show concise summaries of PDF content.
- **Responsive UI:** Built with modern web technologies for a seamless user experience.

## Project Structure

```
frontend/
  src/
    components/
      QuizGenerator.jsx
      VocabularyExtractor.jsx
      TextSummarizer.jsx
      PdfUploader.jsx
      ...
    App.jsx
    main.jsx
    api/
      api.js
    assets/
    styles/
  public/
    index.html
  package.json
  vite.config.js
  README.md
```

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/ashokpaudelapril/pdf_quiz_generator_frontend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `frontend/` directory if you need to override the backend API URL:

```
VITE_API_URL=http://localhost:8000
```

Adjust the URL if your backend is running elsewhere.

### 4. Run the Development Server

```sh
npm run dev
```

The app will be available at `http://localhost:5173`.

## Usage

1. Open the frontend in your browser.
2. Upload a PDF file.
3. Choose to generate a quiz, extract vocabulary, or summarize the text.
4. View and interact with the results.

## Notes

- Ensure the backend server is running and accessible at the API URL configured.
- For production, build the app with `npm run build` and serve the static files.

## License

MIT License

---

For questions or contributions, please open an issue or pull request on the [GitHub repository](https://github.com/ashokpaudelapril/pdf_quiz_generator_frontend)