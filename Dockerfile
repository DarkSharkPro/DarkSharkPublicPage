FROM node:8
COPY . /public
ENV PORT 80
EXPOSE 80
WORKDIR /public
RUN npm i
RUN npm run build
CMD npm start
