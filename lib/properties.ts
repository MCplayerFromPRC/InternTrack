import { PubSub } from "graphql-subscriptions";
import { builder } from "@/graphql/builder";
import { registerDirectives } from "@/graphql/directives";

export const pubsub = new PubSub();

const builderSchema = builder.toSchema({});

export const schema = registerDirectives(builderSchema);
