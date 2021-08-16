import pgClient from './pg-client';
import sqls from './sqls';

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));

    return {
        taskMainList: async () => {
            const pgResp = await pgQuery(sqls.tasksLatest); //The tasksLatest SQL statement is already in api/src/db/sqls.js.
            return pgResp.rows;
        },
    };
};

export default pgApiWrapper;