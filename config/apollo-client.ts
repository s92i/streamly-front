import { SERVER_URL } from "@/lib/constants/url.constants";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
  uri: SERVER_URL,
  credentials: "include",
  headers: {
    "apollo-require-preflight": "true",
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
