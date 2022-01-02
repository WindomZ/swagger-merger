FROM node:alpine

RUN npm install -g swagger-merger watch

CMD ["swagger-merger"]
