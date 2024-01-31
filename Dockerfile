# Node.js Application
FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR ./

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["tsup", "src --out-dir build"]



