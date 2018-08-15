# api

A quick description of api.
  
rem nvm use 8.4.0 8.9.4
rem  gp 6.11.2 7.7.2 8.9.4 8.11.3 9.11.1 10.2.1
rem nvm install node-v9.11.2-x64
rem nvm install node-v7.7.2-x64
rem nvm install node-v8.11.3-x64
rem nvm install node-v6.11.2-x64
nvm use 9.11.2 

timeout 1
strapi start
rem john/12345678
rem npm install --save gatsby-source-strapi 

http://localhost:9002/api/v1/gym
http://localhost:9002/api/v1/gymaggregate
http://localhost:1337/gym/aggregate

strapi generate:api uploadcustom
npm install multer


npm install strapi@3.0.0-alpha.13.1 -g
npm install strapi@3.0.0-alpha.13.1 --save
npm install  strapi-hook-mongoose@3.0.0-alpha.13.1 --save
