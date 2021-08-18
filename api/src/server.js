/** GIA NOTES
 *
 * Use the code below to start a bare-bone express web server
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import DataLoader from 'dataloader';
import { schema } from './schema';

import * as config from './config';
import pgApiWrapper from './db/pg-api'; // This line replaces the pg-client import line.

async function main() {
  const pgApi = await pgApiWrapper(); // This line replaces the pgClient() call line.

  const server = express();
  server.use(cors());
  server.use(morgan('dev'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use('/:fav.ico', (req, res) => res.sendStatus(204));

  // Example route
  server.use('/', (req, res) => {
    const loaders = {
      users: new DataLoader((userIds) => pgApi.usersInfo(userIds)),
    };
    graphqlHTTP({
      schema,
      context: { loaders, pgApi },
      graphiql: true,
      customFormatErrorFn: (err) => {
        const errorReport = {
          message: err.message,
          locations: err.locations,
          stack: err.stack ? err.stack.split('\n') : [], // Makes the error stack show up in development, which is very handy
          path: err.path,
        };
        console.error('GraphQL Error', errorReport); // Logs the error in the server logs
        return config.isDev
          ? errorReport
          : {message: 'Oops! Something went wrong! :('}; // Returns a generic error in production
        },
      })(req, res);
  });

  // This line rus the server
  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`);
  });
}

main();


// const executeGraphQLRequest = async request => {
//   const resp = await graphql(schema, request, rootValue);
//   console.log(resp.data);
// };
//
// executeGraphQLRequest(process.argv[2])