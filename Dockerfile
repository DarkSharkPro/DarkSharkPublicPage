FROM node:8
COPY . /public
EXPOSE 3000
WORKDIR /public
RUN npm i
RUN npm run build
CMD npm start