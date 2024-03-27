import { useState } from "react";
import "./App.css";

interface Item {
  type: string;
  text: string;
}
export default function App() {
  
  const [chat_history, addtohistory] = useState<Item[]>([])
  const [question, setQuestion] = useState();
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  
  const appendItem = (newItem: Item) => {
    addtohistory(prevList => [...prevList, newItem]);
  };

  const handleQuestionChange = (event: any) => {
    setQuestion(event.target.value);

  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    addtohistory([])
    if(event.target.files[0]) setFilename(event.target.files[0].name)
    const fup=document.getElementById('fup')
    if (fup){ fup.style.display='block'}
  };

  const handleSubmit = (event: any) => {
    try{
      const s=document.getElementById('spinner');
      if(s){
        s.style.display='block';
      }
      event.preventDefault();
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      if (question) {
        appendItem({ type: 'user', text: question });
        console.log(question)
        formData.append("question", question);
      }

      fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      }).then((response) => response.json())
        .then((data) => {
          console.log(data.result)
          if(data.result.startsWith('ERROR:')){
            setFile(null)
            setFilename('')
            
            const fup=document.getElementById('fup')
            if(fup) fup.style.display='none'
            appendItem({ type: 'error', text: data.result });
          }else{
            appendItem({ type: 'bot', text: data.result });
          }
        })
        .catch((error) => {
          appendItem({ type: 'Error', text:'An Error Occured' });
        }).finally(()=>{
          if(s) s.style.display='none';
        });
    }catch(err){
      console.log(err)
      appendItem({ type: 'Error', text:'An Error Occured' });
    }
  };

  return (
<div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="ml-2 font-bold text-2xl">ChatDocument</div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
        <input 
          id="file_input" type="file"
          accept=".csv, .txt, .docx, .pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-10 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" />
        <p className="mt-1 text-sm text-500 dark:text-gray-300" id="file_input_help">PDF, DOCX, TXT or CSV (MAX. 100mb).</p>
        <p className="text-green-500" id='fup'>File Uploaded {filename}✅</p>
        <div id="spinner"></div>

      </div>
      <div className="flex flex-col flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            {chat_history.map((item, index) => (
              <div key={index}>
                {item.type==='user' ? (
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        👨🏻‍💼
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>{item.text}</div>
                      </div>
                    </div>
                  </div>
                ) : item.type === 'bot' ?(
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        🤖
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>{item.text}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="items-center">
                      <div className="relative ml-3 text-center text-white font-medium text-sm bg-red-500 py-2 px-4 shadow rounded-xl">
                        <div>{item.text}</div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            ))}
        
          </div>
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="Ask your question here"
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
              </div>
            </div>
            <div className="ml-4">
              <button onClick={handleSubmit} type="submit" disabled={!file || !question} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}