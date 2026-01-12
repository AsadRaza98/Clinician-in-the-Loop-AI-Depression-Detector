import pickle
import nltk
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from fastapi import FastAPI
from pydantic import BaseModel


## making fastAPI object
app = FastAPI()

## defining class for fast API input
class PredictDepression(BaseModel):
    transcript: str

# Text Processing libraries
nltk.download('stopwords')
nltk.download('punkt')

stop_words = stopwords.words('english')
ps = PorterStemmer()
with open('tfidf.pkl', 'rb') as g:
    tfidf_model=pickle.load(g)   


with open('best_model.pkl', 'rb') as f:
    loaded_model = pickle.load(f)
    
def preprocess(inp):
    inp = inp.lower() #convert to lower case 
    inp = inp.replace(r'[^\w\s]+', '') #remove punctuations
    inp = [word for word in inp.split() if word not in (stop_words)] #tokenize the sentence
    inp = ' '.join([ps.stem(i) for i in inp]) #stremming
    inputToModel = tfidf_model.transform([inp]).toarray() #transform to vector form
    return inputToModel

def predict(input_text):
    # Define the input text box
    #print('Input : ',input_text) #take input from user
    processed_array = preprocess(input_text) #preprocess the text 
    predict = loaded_model.predict(processed_array) #Model prediction
    return predict[0]
    

@app.post('/predict')
async def predict_depression(data : PredictDepression):
    
    data = data.dict()
    #data = json.loads(data)
    print(data)
    transcript = data['transcript']
    predicted_label = predict(transcript)
    return predicted_label

##uvicorn ml:app --reload
result = predict('my family is poor.my health is bad and i am  having a horrible life because i failed my maths test.i am not sleeping')

print(result)