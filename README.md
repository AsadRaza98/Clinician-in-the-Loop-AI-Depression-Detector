# Clinician-in-the-Loop-AI-Depression-System for Detection Risk

## Description
CLADS DR is a clinician in the loop AI decision support system that assists mental health professionals in assessing depression risk from textual session notes. The system provides probabilistic risk indicators and enforces mandatory human review. It is not a diagnostic tool.

This project was developed as an Innovation Driven project for the AI Systems Engineering course.

---

## System Components
- React frontend (clinician interface)
- Node.js backend (authentication and session handling)
- MongoDB (data storage)
- FastAPI AI inference service (text preprocessing and ML prediction)

## How to Run the Project Locally

### Prerequisites
- Node.js
- Python 3
- MongoDB

### Steps
Step 1: Make Sure Docker is running on Mongo
1) Open CMD
2) Type 'docker start mongo'
3) Ensure Mongo is running on Docker

Step 2: Open Mongo Backend
1) Open CMD
2) Type 'cd C:\Users\hp\Downloads\AI_Systems\Depression_Detection\code_files\code\checkAuth\auth-demo2'
3) Type 'node index.js'

Step 3: Open ML API
1) Open Anaconda Prompt
2) Type 'cd  C:\Users\hp\Downloads\AI_Systems\Depression_Detection'
3) Type 'python -m uvicorn main:app --port 8000'

Step 4: Open React Front end
1) Open CMD
2) Type 'cd C:\Users\hp\Downloads\AI_Systems\Depression_Detection\code_files\front end\DepressionDetectionCode'
3) Type 'npm start'

Note: Replace 'C:\Users\hp\Downloads\' with the local path where you have downloaded the code folder named 'AI_Systems'
---

## Disclaimer
This system is for educational and research purposes only and must not be used for clinical diagnosis or treatment.

## Authors
Asad Raza
Syed Jahanzaib Ali Zaidi
