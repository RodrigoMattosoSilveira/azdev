import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';
import User from './user';
import Approach from "./approach";

const Task = new GraphQLObjectType({
    name: 'Task',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        tags: {
            type: new GraphQLNonNull(
                new GraphQLList(new GraphQLNonNull(GraphQLString))
            ),
            resolve: (source) => source.tags.split(','),
        },
        approachCount: { type: new GraphQLNonNull(GraphQLInt) },
        approachList: {
            type: new GraphQLNonNull(
                new GraphQLList(new GraphQLNonNull(Approach)) // Approach is the new GraphQL type we need to introduce.
            ),
            // resolve: (source, args, { pgApi }) =>
            //     pgApi.approachList(source.id), // pgApi.approachList receives the ID of a Task object (source.id) and should return a list of Approach objects.
            // },
            resolve: (source, args, { loaders }) =>
                loaders.approachLists.load(source.id),
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (source) => source.createdAt.toISOString(),
        },
        author: {
            type: new GraphQLNonNull(User),
            resolve: (source, args, { loaders }) =>
                loaders.users.load(source.userId),
        },
    },
});

export default Task;