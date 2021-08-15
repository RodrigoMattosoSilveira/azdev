import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull, GraphQLFloat,
} from 'graphql';

const NumbersInRangeAverage = new GraphQLObjectType({
    name: 'NumbersInRangeAverage',
    description: 'Expanded aggregate info on a range of numbers',
    fields: {
        sum: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        average: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
    },
});

export default NumbersInRangeAverage;