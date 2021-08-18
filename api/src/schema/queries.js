import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    printSchema,
    GraphQLList,
} from 'graphql';
import NumbersInRange from './types/numbers-in-range';
import NumbersInRangeAverage from './types/numbers-in-range-average';
import Task from "./types/task";

import {numbersInRangeAverageObject, numbersInRangeObject} from '../utils';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        // currentTime: {
        //     type: GraphQLString,
        //     resolve: () => {
        //         const isoString = new Date().toISOString();
        //         return isoString.slice(11, 19);
        //     },
        // },
        currentTime: {
            type: GraphQLString,
            resolve: () => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const isoString = new Date().toISOString();
                        resolve(isoString.slice(11, 19));
                    }, 5000);
                });
            },
        },
        sumNumbersInRange: {
            type: new GraphQLNonNull(GraphQLInt),
            args: {
                begin: { type: new GraphQLNonNull(GraphQLInt) },
                end: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (source, {begin, end}) => {
                let sum = 0;
                for (let i = begin; i <= end; i++) {
                    sum += i;
                }
                return sum;
            }
        },
        numbersInRange: {
            type: NumbersInRange,
            args: {
                begin: { type: new GraphQLNonNull(GraphQLInt) },
                end: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: function (source, { begin, end }) {
                return numbersInRangeObject(begin, end);
            },
        },
        numbersInRangeAverage: {
            type: NumbersInRangeAverage,
            args: {
                begin: { type: new GraphQLNonNull(GraphQLInt) },
                end: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: function (source, { begin, end }) {
                return numbersInRangeAverageObject(begin, end);
            },
        },
        taskMainList: {
            type: new GraphQLList(new GraphQLNonNull(Task)),
            resolve: async (source, args, { pgApi }) => {
                return pgApi.taskMainList();
            },
        }
    },
});

export default QueryType