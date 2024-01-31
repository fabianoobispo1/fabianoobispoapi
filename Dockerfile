# Node.js Application
FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR ./

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3333
CMD ["npm run build", "npm run start"]


