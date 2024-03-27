# Chat Genius

## Preface
Chat Genius is an innovative chatbot application designed to simplify information retrieval from text-based documents. Whether you need quick answers from a large dataset or want to summarize key points from extensive text files, Chat Genius has got you covered.

# Features 
Upload various file formats, including PDFs, DOCX, TXT, and CSV, with a maximum size of 100MB.
Utilizes the Retrieval-Augmented Generation (RAG) architecture for accurate responses.
Seamlessly integrates with backend Python code for efficient processing.
Interactive and intuitive frontend built using React and Tailwind CSS.

# Project Structure

The project consists of two main directories:

1.  Backend: Contains the server-side Python code responsible for processing user queries and generating responses using the RAG architecture.
2.  Frontend: Houses the client-side TypeScript code for the interactive user interface, allowing users to upload files, ask questions, and receive answers.

## Backend Architecture
The heart of Chatbot Application lies in its backend architecture, powered by the RAG model. Here's an overview of the key components:

1. RAG Class: Implements the Retrieval-Augmented Generation architecture, managing file uploads, query processing, and response generation.
2. Conversation Retrieval Chain: A sequence of chains for retrieving relevant information based on the user's query and chat history, incorporating BGE-Embeddings and Gemini-pro model.
3. Pandas DataFrame Agent: Handles query processing for CSV files, enabling efficient data retrieval.
4. Predict Endpoint: Handles POST requests from users, orchestrating the RAG class to provide accurate responses.

## Frontend Experience
The frontend of Chat Genius is designed to be user-friendly and visually appealing. It allows users to interact seamlessly with the application, upload files, ask questions, and receive concise answers. The frontend is built using React for dynamic rendering and Tailwind CSS for stylish UI components.

The project structure within the `frontend` directory follows the official `create-react-app` structure as in the [docs](https://create-react-app.dev/docs/folder-structure). Some of the files have been removed for convenience & brevity.


## Getting Started
To run the Chat Genius application locally:

1. Backend Installation:

Navigate to the backend directory and install the required dependencies using 'pip install -r requirements.txt'.
Launch the server with 'uvicorn main:app --reload'.

2. Frontend Installation:

Navigate to the frontend directory and install dependencies with 'npm install'.
Start the frontend server with 'npm start'.

3. Access the Application:

Open your browser and visit http://localhost:3000 to access the Chat Genius application.

### Conclusion
Chat Genius revolutionizes the way we interact with text-based documents, offering a seamless and efficient solution for information retrieval and summarization. With its intuitive user interface and powerful backend architecture, Chat Genius is your ultimate assistant for extracting insights from text data.
