import { getCookie } from "cookies-next";
import { GraphQLClient } from "graphql-request";
import { mutate } from "swr";

const endpoint = process.env.NEXT_PUBLIC_BACKEND_API || "";

const token = getCookie("authtoken");

export const client = new GraphQLClient(endpoint, {
  headers: { authorization: token ? `Bearer ${token}` : "" },
});

export const fetcher = (query: any, variable: any) =>
  client.request(query, variable);
