import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        name: {
            type: GraphQLString,
            resolve: ({ firstName, lastName }) =>
                `${firstName} ${lastName}`,
        },
    },
});

export default User;