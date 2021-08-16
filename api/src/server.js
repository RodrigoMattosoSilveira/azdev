/** GIA NOTES
 *
 * Use the code below to start a bare-bone express web server

 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';

import * as config from './config';
import pgClient from './db/pg-client';

async function main() {
  const { pgPool } = await pgClient();
  const server = express();
  server.use(cors());
  server.use(morgan('dev'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use('/:fav.ico', (req, res) => res.sendStatus(204));

  // Example route
  server.use('/',    graphqlHTTP({
    schema,
    context: { pgPool },
    graphiql: true,
  }));

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