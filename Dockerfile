FROM node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps
RUN npm install react-scripts --legacy-peer-deps

COPY . ./
EXPOSE 3000
CMD ["npm", "start"]