## setting and configuring

npm init -y
npm i express dotenv cors express-validator @prisma/client
npm i -D typescript @types/node @types/express @types/dotenv @types/cors
npm i --save-dev prisma esbuild-register nodemon
npx prisma init --datasource-provider sqlite

## create database and add models

npx prisma db push
