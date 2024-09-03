import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.stem import PorterStemmer
from keras.preprocessing.sequence import pad_sequences
import json
import pickle
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.layers import Layer, Dense
import random 
from keras.layers import Embedding, LSTM
from keras.layers import Flatten


nltk.download('stopwords')
nltk.download('punkt')
lemmatizer = WordNetLemmatizer()
ignore_words = ['?', '!']

with open(r'./data/dataset.json') as file:
    intents = json.load(file)


def preprocess_text(text):
    text = text.lower()
    tokens = nltk.word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens]
    stemmer = PorterStemmer()
    stemmed_tokens = [stemmer.stem(token) for token in lemmatized_tokens]
    stemmed_tokens = [token for token in stemmed_tokens if token.isalnum()]
    stemmed_tokens = [token for token in stemmed_tokens if len(token) > 2]
    stemmed_tokens = [token for token in stemmed_tokens if token not in ignore_words]
    return stemmed_tokens


words = []
classes = []
documents = []

for intent in intents['intents']:
    for pattern in intent['patterns']:
        preprocessed_pattern = preprocess_text(pattern)
        words.extend(preprocessed_pattern)
        documents.append((preprocessed_pattern, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])


classes = sorted(list(set(classes)))


pickle.dump(words, open('texts.pkl', 'wb'))
pickle.dump(classes, open('labels.pkl', 'wb')) 
training = []
output_empty = [0] * len(classes)


for doc in documents:
    bag = []
    pattern_words = doc[0]
    pattern_words = [lemmatizer.lemmatize(word.lower()) for word in pattern_words]
    for w in words:
        bag.append(1) if w in pattern_words else bag.append(0)
    
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    training.append([bag, output_row])

random.shuffle(training)



max_seq_length = max(len(doc[0]) for doc in training)
padded_training = [(pad_sequences([doc[0]], maxlen=max_seq_length)[0], doc[1]) for doc in training]

train_x = [np.array(doc[0]) for doc in padded_training]
train_y = [np.array(doc[1]) for doc in padded_training]
train_x = np.array(train_x)
train_y = np.array(train_y)
vocab_size = len(words) + 1

model = Sequential()
model.add(Embedding(vocab_size, 50, input_length=max_seq_length))
model.add(Flatten())
model.add(Dense(50, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(classes) , activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(train_x, train_y, epochs=200, batch_size=32)

loss, accuracy = model.evaluate(train_x, train_y)
print("Accuracy: {:.2f}%".format(accuracy * 100))
