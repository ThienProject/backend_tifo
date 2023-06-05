"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../configs/connectDB"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
var _ = require('lodash');
var bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const saltRounds = 10;
const authService = {
    getUsers: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { offset, limit, filters } = payload;
        let filterSql = '';
        if (filters) {
            for (let i = 0; i < filters.length; i++) {
                if (filters[i] === 'reported') {
                    filterSql += ` and post_reports.count >0  `;
                }
                if (filters[i] === 'banned') {
                    filterSql += ` and banned.id_user IS NOT NULL  `;
                }
            }
        }
        const users = yield (0, connectDB_1.default)(`
      SELECT  count.total, 
    post_reports.count as post_reports,
 		user.id_user,
        role.id_role, role.role, COUNT(post.id_post) AS post_quantity, 
       fullname, username, 
       CASE
         WHEN banned.id_user IS NOT NULL THEN 'banned'
         WHEN post_reports.count > 0 THEN 'reported'
         ELSE user.status
       END AS status,
       phone, email, address, birthday, gender, avatar, cover
        FROM (select count(id_user) as total from user WHERE user.id_role <> 3)as count ,
        user
        left JOIN role ON role.id_role = user.id_role 
        LEFT JOIN post ON post.id_user = user.id_user
        LEFT JOIN banned ON banned.id_user = user.id_user
        left JOIN (select post.id_user,COALESCE(count(DISTINCT post.id_post),0) as count from report, post WHERE post.id_post = report.id_post group by post.id_post) as post_reports on post_reports.id_user = user.id_user
        where role.id_role <> 3
        ${filterSql} 
        GROUP BY user.id_user
        ORDER BY status DESC
      limit ${limit} offset ${offset}
      `);
        if (_.isEmpty(users)) {
            return {
                users,
                messages: 'No account !'
            };
        }
        else {
            return {
                users,
                total: ((_a = users[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
                messages: 'Search success !'
            };
        }
    }),
    getUserByID: ({ id_user }) => __awaiter(void 0, void 0, void 0, function* () {
        const rows = yield (0, connectDB_1.default)(` 
      SELECT  count.total, 
    	post_reports.count as post_reports,
 		user.id_user,
        user.datetime,
        role.id_role, role.role, COUNT(post.id_post) AS post_quantity, 
       fullname, username, 
       CASE
         WHEN banned.id_user IS NOT NULL THEN 'banned'
         WHEN post_reports.count > 0 THEN 'reported'
         ELSE user.status
       END AS status,
       phone, email, address, birthday, gender, avatar, cover
        FROM (select count(id_user) as total from user WHERE user.id_role <> 3)as count ,
        user
        RIGHT JOIN role ON role.id_role = user.id_role AND role.id_role <> 3
        LEFT JOIN post ON post.id_user = user.id_user
        LEFT JOIN banned ON banned.id_user = user.id_user
        left JOIN (select post.id_user,COALESCE(count(DISTINCT post.id_post),0) as count from report, post WHERE post.id_post = report.id_post group by post.id_post ) as post_reports on post_reports.id_user = user.id_user
        where user.id_user = '${id_user}'
        GROUP BY user.id_user
        ORDER BY status DESC`);
        if (_.isEmpty(rows))
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Can't find out user account!");
        else {
            const user = rows[0];
            const { password, address, birthday } = user, userRest = __rest(user, ["password", "address", "birthday"]);
            return {
                user: userRest,
                message: "Get user success!"
            };
        }
    }),
    lockUser: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { reason, id_user } = body;
        let sql = `insert into banned (id_user, reason) values ('${id_user}', '${reason}')`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            return {
                id_user: id_user,
                message: 'banned success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'banned failed, please try again later!');
        }
    }),
    unlockUser: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_user } = body;
        let sql = `delete from banned where banned.id_user=  '${id_user}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            return {
                id_user: id_user,
                message: 'unlock user success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'unlock user failed, please try again later!');
        }
    }),
    unlockPost: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post } = body;
        let sql = `update post set is_banned = false , banned_reason = "Null"  where id_post  = '${id_post}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            return {
                id_post: id_post,
                message: 'unlock success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'unlock failed, please try again later!');
        }
    }),
    changeRoleUser: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_role, id_user } = body;
        let sql = `update user set id_role = '${id_role}' where id_user = '${id_user}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            return {
                id_user: id_user,
                message: 'change role success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'change role failed, please try again later!');
        }
    }),
    lockPost: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const { reason, id_post } = body;
        let sql = `update post set is_banned = true , banned_reason = '${reason}'  where id_post  = '${id_post}'`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row.insertId >= 0) {
            return {
                id_post: id_post,
                message: 'banned success !'
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'banned failed, please try again later!');
        }
    }),
    getPosts: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const { id_user, offset, limit, filters } = payload;
        let filterSql = '';
        if (filters) {
            for (let i = 0; i < filters.length; i++) {
                if (filters[i] === 'reported') {
                    filterSql += ` and report.count >0  `;
                }
                if (filters[i] === 'banned') {
                    filterSql += ` and post.is_banned >0 `;
                }
            }
        }
        const sql = `SELECT post.*, user.id_user, user.username, user.avatar, user.fullname , 
    report.count as reports_quantity, loves.count as loves, count.total,
     CASE
         WHEN  post.is_banned > 0 THEN 'banned'
         WHEN report.count > 0 THEN 'reported'
         ELSE 'active'
       END AS status
    from user, (select count(id_post) as total from post  ${id_user ? ` where post.id_user = '${id_user}'` : ' '})as count, post
    left join (SELECT  report.id_post, count(report.id_post) as count FROM report, post where post.id_post =  report.id_post and post.is_banned = false GROUP by report.id_post ) as report 
     on report.id_post = post.id_post
    left join (SELECT  love.id_post, count(love.id_post) as count FROM love  GROUP by love.id_post) as loves 
    on loves.id_post = post.id_post
    where post.id_user = user.id_user 
    ${id_user ? ` and user.id_user = '${id_user}' ` : ' '}
    ${filterSql}
    order by status desc
    limit ${limit} offset ${offset}`;
        const rows = yield (0, connectDB_1.default)(sql);
        const posts = rows;
        return {
            posts,
            total: ((_b = posts[0]) === null || _b === void 0 ? void 0 : _b.total) || 0,
            message: "Get posts success!"
        };
    }),
    getPost: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_post } = query;
        const sql = `SELECT post.*,  
              user.username,
              user.avatar,
              user.fullname,
              userReport.username as reportUsername,
              userReport.avatar as reportAvatar,
              userReport.id_user as reportId_user,
              report.reason as reportReason,
              report.datetime as reportDatetime,
              ( select count(love.id_user) as loves from love WHERE love.id_post ='${id_post}'  ) as loves,
              ( select count(comment.id_comment) as comments from comment WHERE comment.id_post ='${id_post}'  ) as comments
              FROM post
              left join user on post.id_user = user.id_user 
              left join report on report.id_post = post.id_post
              left join (select user.id_user,  user.username, user.avatar from user ) as userReport
              	on userReport.id_user = report.id_user    
              WHERE post.id_post = '${id_post}' `;
        const rows = yield (0, connectDB_1.default)(sql);
        if (rows.length > 0) {
            const newPost = rows.reduce((accumulator, currentValue) => {
                const { reportUsername: username, reportId_user: id_user, reportReason: reason, reportDatetime: datetime, reportAvatar: avatar } = currentValue, restPost = __rest(currentValue, ["reportUsername", "reportId_user", "reportReason", "reportDatetime", "reportAvatar"]);
                const reported = id_user ? { username, id_user, reason, datetime, avatar } : null;
                const index = accumulator.findIndex((item) => item.id_post === currentValue.id_post);
                if (index === -1) {
                    const newValue = restPost;
                    if (reported) {
                        newValue.reports = [reported];
                    }
                    accumulator.push(newValue);
                }
                else {
                    if (reported) {
                        accumulator[index].reports.push(reported);
                    }
                }
                return accumulator;
            }, []);
            const post = newPost[0];
            const medias = yield (0, connectDB_1.default)(`select *from media where id_post = '${id_post}'`);
            post.medias = medias;
            return {
                post,
                message: "Get posts success!"
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This post does not exist !");
        }
    }),
    userStatistics: () => __awaiter(void 0, void 0, void 0, function* () {
        const sql = `select count(user.id_user) as total 
          ,(select count(user.id_user)  
          from user 
          where MONTH(user.datetime) = MONTH(CURDATE()) ) as increaseMonth 
          from user `;
        const row = yield (0, connectDB_1.default)(sql);
        if (row) {
            return {
                total: row[0].total,
                increaseMonth: row[0].increaseMonth
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Statistics failed, please try again later!');
        }
    }),
    userStatisticsAge: () => __awaiter(void 0, void 0, void 0, function* () {
        const sql = `SELECT
    (SELECT COUNT(*) FROM user WHERE TIMESTAMPDIFF(YEAR, birthday, CURDATE()) BETWEEN 13 AND 17) * 100.0 / (SELECT COUNT(*) FROM user) AS percentage_13_17,
    (SELECT COUNT(*) FROM user WHERE TIMESTAMPDIFF(YEAR, birthday, CURDATE()) BETWEEN 18 AND 24) * 100.0 / (SELECT COUNT(*) FROM user) AS percentage_18_24,
    (SELECT COUNT(*) FROM user WHERE TIMESTAMPDIFF(YEAR, birthday, CURDATE()) BETWEEN 25 AND 44) * 100.0 / (SELECT COUNT(*) FROM user) AS percentage_25_44,
    (SELECT COUNT(*) FROM user WHERE TIMESTAMPDIFF(YEAR, birthday, CURDATE()) >= 45) * 100.0 / (SELECT COUNT(*) FROM user) AS percentage_45_above;`;
        const row = yield (0, connectDB_1.default)(sql);
        if (row) {
            return {
                statistics: row[0]
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Statistics failed, please try again later!');
        }
    }),
    followStatistics: () => __awaiter(void 0, void 0, void 0, function* () {
        const sql = `select user.id_user, user.username, user.fullname, user.avatar, user.cover , count(follow.id_follower) as followers
              FROM user , follow
              WHERE user.id_user = follow.id_user and follow.status = 'accept' and user.id_user not in (select banned.id_user from banned)
              GROUP by user.id_user
              ORDER by followers desc
              LIMIT 4`;
        const users = yield (0, connectDB_1.default)(sql);
        if (users) {
            return {
                users
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Statistics failed, please try again later!');
        }
    }),
    postStatistics: () => __awaiter(void 0, void 0, void 0, function* () {
        const sql = `SELECT dates.post_date, COALESCE(post_counts.total_posts, 0) AS posts_7, COALESCE(post_counts.total_reels, 0) AS reels_7, 
(select count(id_post) from post) as totals, (select count(id_post) from post WHERE post.type ="reel") as total_reels,
 (select count(id_post) from post WHERE post.type ="post") as total_posts
FROM (
  SELECT DATE(DATE_SUB(NOW(), INTERVAL n.num DAY)) AS post_date
  FROM (
    SELECT 0 AS num UNION ALL
    SELECT 1 UNION ALL
    SELECT 2 UNION ALL
    SELECT 3 UNION ALL
    SELECT 4 UNION ALL
    SELECT 5 UNION ALL
    SELECT 6
  ) n
) dates
LEFT JOIN (
  SELECT DATE(post.date_time) AS post_date,
         SUM(CASE WHEN post.type = 'post' THEN 1 ELSE 0 END) AS total_posts,
         SUM(CASE WHEN post.type = 'reel' THEN 1 ELSE 0 END) AS total_reels
  FROM post
  WHERE post.type IN ('post', 'reel')
        AND post.date_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
  GROUP BY post_date
) post_counts ON dates.post_date = post_counts.post_date
ORDER BY dates.post_date ASC;
`;
        const results = yield (0, connectDB_1.default)(sql);
        if (results) {
            const { totals, total_posts, total_reels } = results[0];
            const statistics = { totals, total_posts, total_reels, reels: [], posts: [] };
            results.forEach((item) => {
                statistics.reels.push(Number(item.reels_7));
                statistics.posts.push(Number(item.posts_7));
            });
            return {
                statistics
            };
        }
        else {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Statistics failed, please try again later!');
        }
    })
};
exports.default = authService;
