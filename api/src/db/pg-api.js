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
        userInfo: async (userId) => {
            const pgResp = await pgQuery(sqls.usersFromIds, {$1: [userId]}); // Passes $1 to the SQL statement as [userId]
            return pgResp.rows[0];
        },
        usersInfo: async (userIds) => {
            const pgResp = await pgQuery(sqls.usersFromIds, {$1: [userIds]}); // Passes $1 to the SQL statement as [userIds]
            return userIds.map((userId) =>
                pgResp.rows.find((row) => userId === row.id) // Uses a .map call on the input array to ensure that the output array has the exact same length and order. DataLoader will not work properly if you don’t do that.
            );
        },
        approachList: async (taskId) => {
            const pgResp = await pgQuery(sqls.approachesForTaskIds, {
                $1: [taskId], // Passes $1 to the SQL statement as [taskId]
            });
            return pgResp.rows;
        },
    }
};

export default pgApiWrapper;