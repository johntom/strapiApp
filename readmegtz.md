
on Mikes computer must blank the following
  "username": "",
        "password": "",


Nvm install node-v9.11.2-x64

nvm use 8.9
after updating both mongo & strapi and leaving the username and password blank when using strapi new ... it now works!
strapi start
http://localhost:1337/admin


npm install --global gatsby-cli
 http://localhost:8000

 npm install --save gatsby-source-strapi



 Migrating from 3.0.0-alpha.11 to 3.0.0-alpha.12
 
 install repos locally ...
 http://localhost:1337/playground not http://localhost:1337/graphql

 
{
  articles {
  title ,content }
}

Update node modules
Update the Strapi's dependencies version (move Strapi's dependencies to 3.0.0-alpha.12.4 version) of your project.

Run npm install strapi@3.0.0-alpha.12.4 --save to update your strapi version and then run the same command for
Run npm install strapi-mongoose@3.0.0-alpha.12.4
or strapi-bookshelf depending on the module you use in your application.

Aug 2018 in GP
strapi generate api:gymaggregate