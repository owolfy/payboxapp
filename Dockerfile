FROM node
WORKDIR /app

COPY /todos/package.json /app/todos/
COPY /todos/package-lock.json /app/todos/
RUN cd /app/todos && npm install
COPY /todos /app/todos/

COPY /notification/package.json /app/notification/
COPY /notification/package-lock.json /app/notification/
RUN cd /app/notification && npm install
COPY /notification /app/notification/

EXPOSE 3000
EXPOSE 3001
