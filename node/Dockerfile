FROM node:5.2.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
RUN mkdir /myapp
WORKDIR /myapp
ADD . /myapp
RUN npm install -g concurrently
RUN npm install
CMD npm run dev