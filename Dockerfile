# Node.js Application
FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3333
CMD ["npm", "dev"]

# Database Service
# Use the same version as your production database
FROM bitnami/postgresql:latest
ENV POSTGRES_DB=apisolid
ENV POSTGRES_USER=docker
ENV POSTGRES_PASSWORD=docker

EXPOSE 5432
