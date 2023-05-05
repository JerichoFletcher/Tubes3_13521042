const fs = require("fs");
const Sequelize = require('sequelize');

// const schemaDefinition = [
//     '/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */',
//     '/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */',
//     '/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */',
//     '/*!40101 SET NAMES utf8 */',
//     '/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */',
//     '/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=\'NO_AUTO_VALUE_ON_ZERO\' */',
//     '/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */',

//     // # ------------------------------------------------------------
//     // # SCHEMA DUMP FOR TABLE: chats
//     // # ------------------------------------------------------------

//     // 'DROP TABLE IF EXISTS `chats`',
//     'CREATE TABLE IF NOT EXISTS `chats` (' +
//     '  `history_id` int(11) NOT NULL,' +
//     '  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),' +
//     '  `question` varchar(1000) NOT NULL,' +
//     '  `answer` varchar(3000) NOT NULL,' +
//     '  `algorithm` varchar(3) DEFAULT NULL,' +
//     '  PRIMARY KEY (`history_id`, `timestamp`),' +
//     '  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`history_id`) REFERENCES `histories` (`history_id`)' +
//     ')',
//     // ') ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci',

//     // # ------------------------------------------------------------
//     // # SCHEMA DUMP FOR TABLE: histories
//     // # ------------------------------------------------------------

//     // 'DROP TABLE IF EXISTS `histories`',
//     'CREATE TABLE IF NOT EXISTS `histories` (' +
//     '  `history_id` int(11) NOT NULL AUTO_INCREMENT,' +
//     '  `history_name` varchar(50) NOT NULL,' +
//     '  PRIMARY KEY (`history_id`)' +
//     ')',
//     // ') ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci',

//     // # ------------------------------------------------------------
//     // # SCHEMA DUMP FOR TABLE: questions
//     // # ------------------------------------------------------------

//     // 'DROP TABLE IF EXISTS `questions`',
//     'CREATE TABLE IF NOT EXISTS `questions` (' +
//     '  `question_pattern` varchar(500) NOT NULL,' +
//     '  `answer_pattern` varchar(1500) NOT NULL,' +
//     '  PRIMARY KEY (`question_pattern`)' +
//     ')',
//     // ') ENGINE = InnoDB DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_general_ci',

//     '/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */',
//     '/*!40101 SET SQL_MODE=@OLD_SQL_MODE */',
//     '/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */',
//     '/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */',
//     '/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */',
//     '/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;'
// ];

module.exports = {
    importDBSequelize: async function(dbName, cred, dumpPath){
        let sequelize = new Sequelize(dbName, cred.user, cred.password, {dialect: 'mysql', dialectModule: require('mysql'), logging: console.log});

        console.log(`[INFO] Loading ${dumpPath}...`);
        let queries = fs.readFileSync(dumpPath, {encoding: "UTF-8"}).split(";\n");
        // let queries = schemaDefinition;

        await sequelize.query('set FOREIGN_KEY_CHECKS=0');
        await sequelize.query('set UNIQUE_CHECKS=0');
        await sequelize.query('set SQL_MODE=\'NO_AUTO_VALUE_ON_ZERO\'');
        await sequelize.query('set SQL_NOTES=0');

        console.log(`[INFO] Importing queries...`);
        console.time(`[INFO] Import ${dumpPath} finished in`);
        for (let query of queries) {
            query = query.trim();
            if (query.length !== 0 && !query.match(/\/\*/)) {
                await sequelize.query(query, {raw: true});
            }
        }
        
        console.timeEnd(`[INFO] Import ${dumpPath} finished in`);
    },
    /**
     * Imports database from a dumpfile.
     * @param {mysql.Connection} conn Connection.
     * @param {*} dumpPath Path to dump file.
     */
    importDBMySQL: async function(conn, dumpPath){
        console.log(`[INFO] Loading ${dumpPath}...`);
        let queries = fs.readFileSync(dumpPath, {encoding: "UTF-8"}).split(";\n");
        // let queries = schemaDefinition;

        conn.query('set FOREIGN_KEY_CHECKS=0');
        conn.query('set UNIQUE_CHECKS=0');
        conn.query('set SQL_MODE=\'NO_AUTO_VALUE_ON_ZERO\'');
        conn.query('set SQL_NOTES=0');

        console.log(`[INFO] Importing queries...`);
        console.time(`[INFO] Import ${dumpPath} finished in`);
        for (let query of queries) {
            query = query.trim();
            if (query.length !== 0 && !query.match(/\/\*/)) {
                conn.query(query);
            }
        }
        
        console.timeEnd(`[INFO] Import ${dumpPath} finished in`);
    }
}
