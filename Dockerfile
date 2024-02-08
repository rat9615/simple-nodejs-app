FROM node

WORKDIR /app

COPY . .

EXPOSE 3000

COPY package*.json ./

# Use CMD to run npm start by default
CMD ["npm", "start"]
