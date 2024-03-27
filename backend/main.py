from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any
import pandas as pd
import docx
from PyPDF2 import PdfReader
from rag import RAG


obj=RAG()
load_dotenv()

class Response(BaseModel):
    result: str | None

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model = Response)
async def predict(question: str = Form(None) ,file: UploadFile = File(None)) -> dict: 
    try:
        if (file is not None) and (obj.filename != file.filename): # if file if uploaded and is different form the previous loaded file
            if(file.size/(1024*1024)>100): # check if filesize is greater than 100mb
                obj.filename=''
                return {"result": f"ERROR: Reached filesize limit<=100mb, your filesize={file.size/(1024*1024):.2f}mb"}
            elif(file.filename.rsplit('.', 1)[-1] not in ['pdf', 'docx', 'txt', 'csv']): #check if file has unsupported extension
                obj.filename=''
                return {"result":"ERROR: Unsupported datatype"}
            
            obj.filename=file.filename
            
            if file.filename.endswith(".csv"): 
                obj.isCSV=True
                df = pd.read_csv(file.file)
                obj.prepare_agent(df)
            else:
                obj.isCSV=False
                if file.filename.endswith(".txt"):
                    text = file.file.read().decode("utf-8")
                elif file.filename.endswith(".docx"):
                    doc = docx.Document(file.file)
                    paragraphs = [p.text for p in doc.paragraphs]
                    text = "\n".join(paragraphs)
                elif file.filename.endswith(".pdf"):
                    text=""
                    pdf_reader=PdfReader(file.file)
                    for page in pdf_reader.pages:
                        text+=page.extract_text()
                obj.prepare_chain(text)

        res=obj.predict(question)      
    except Exception as e:
        print(e)
        res="ERROR: Unable to process due to some error!☠️☠️☠️"
    return {"result":res}

@app.get('/')
def main()->str:
    return "hello world"