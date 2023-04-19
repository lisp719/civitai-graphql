import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import got from "got";

const typeDefs = `#graphql
  type Model {
    id: ID!
    name: String!
    modelVersions: [ModelVersion]!
  }

  type ModelVersion {
    id: ID!
    name: String!
    downloadUrl: String!
  }

  type Query {
    model(id: ID!): Model
  }
`;

const resolvers = {
  Query: {
    model: async (_parent, args) => {
      const data = await got(
        `https://civitai.com/api/v1/models/${args.id}`
      ).json();

      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});

console.log(`🚀  Server ready at: ${url}`);
