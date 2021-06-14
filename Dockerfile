FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install --g truffle@5.1.39

RUN npm install


RUN truffle deploy --network ropsten --skipDryRun

CMD ["npm", "start"]