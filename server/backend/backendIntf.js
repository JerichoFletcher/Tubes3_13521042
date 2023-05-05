const sql = require('../database/sql.js');
const Str = require('./string.js');
const getSimilarityPercentage = require('./levenshtein.js');
const evaluate = require('./calculator.js');
const findTheDay = require('./calendar.js');
const kmp = require('./kmp.js');
const bmMatch = require('./boyermoore.js');

var debugLevel = 2;

/**
 * A map of available string-matching algorithms.
 */
const algorithms = new Map([
    ['KMP', kmp],
    ['BM', bmMatch]
]);

function init(){
    console.log('[INFO] Initializing...');
    sql.loadSQL();
}

function end(){
    console.log('[INFO] Ending service...');
    sql.dumpSQL();
}

function setDebugLevel(val){
    if(typeof val !== 'number')throw new TypeError();
    debugLevel = Math.floor(val);
}

/**
 * Receives a user query and returns the appropriate response.
 * @param {string} query User query to evaluate.
 * @param {UserQueryConfig} config Configuration for the current user query.
 * @returns {Promise<{history_id: number, timestamp: Date, question: string, answer: string, algorithm: string}>} A chat object containing information about the chat response.
 */
async function acceptUserQuery(query, config){
    return new Promise(async(resolve, reject) => {
        // Argument type check
        if(typeof query !== 'string' || typeof config !== 'object' || !(config instanceof UserQueryConfig)){
            reject(new TypeError());
        }else{
            // Process query and get response string
            console.log(`[TEST] ${query} <${typeof query}> vs ${config}`);
            query = query.trim().toLowerCase().replace(/\s+/, ' ');
            let response, groups, match;
            let isDBMQuery = false, alsoLookInDB = true;
            
            // If requesting for new history ID, generate a new one
            if(config.requestNewHistoryId){
                const id = await sql.addHistory(query.slice(0, 10));
                config.historyId = id;
            }
            
            // Prioritize parsing DBM queries
            if((match = query.matchAll(/(Add question )(.+)( with answer )(.+)/gi)) && (groups = [...match]) && groups.length > 0){
                const newQuestion = groups[0][2];
                const newAnswer = groups[0][4];
                logParse(groups[0][0], `as DBM-Add/Update query updating '${newQuestion}': '${newAnswer}'`);
                isDBMQuery = true;
                alsoLookInDB = false;

                // DBM query for adding question-answer pair
                try{
                    const succ = await sql.addQuestion(newQuestion, newAnswer);
                    if(succ){
                        response = `Successfully added the question '${newQuestion}' with the answer '${newAnswer}'.`;
                    }else{
                        response = `Successfully updated the question '${newQuestion}' with the new answer '${newAnswer}'.`;
                    }
                }catch(e){
                    logError(query, e);
                    response = `I'm sorry, but an error has occured while updating the question '${newQuestion}' with the answer '${newAnswer}'.`;
                }
            }
            else if((match = query.matchAll(/(Tambah pertanyaan )(.+)( dengan jawaban )(.+)/gi)) && (groups = [...match]) && groups.length > 0){
                const newQuestion = groups[0][2];
                const newAnswer = groups[0][4];
                logParse(groups[0][0], `as DBM-Add/Update query updating '${newQuestion}': '${newAnswer}'`);
                isDBMQuery = true;
                alsoLookInDB = false;

                // DBM query for adding question-answer pair
                try{
                    const succ = await sql.addQuestion(newQuestion, newAnswer);
                    if(succ){
                        response = `Successfully added the question '${newQuestion}' with the answer '${newAnswer}'.`;
                    }else{
                        response = `Successfully updated the question '${newQuestion}' with the new answer '${newAnswer}'.`;
                    }
                }catch(e){
                    logError(query, e);
                    response = `I'm sorry, but an error has occured while updating the question '${newQuestion}' with the answer '${newAnswer}'.`;
                }
            }
            else if((match = query.matchAll(/((Remove|Delete) question )(.+)/gi)) && (groups = [...match]) && groups.length > 0){
                const questionToDelete = groups[0][3];
                logParse(groups[0][0], `as DBM-Delete query removing '${questionToDelete}'`);
                isDBMQuery = true;
                alsoLookInDB = false;

                // DBM query for removing question-answer pair
                try{
                    const succ = await sql.removeQuestion(questionToDelete);
                    if(succ){
                        response = `Successfully removed the question '${questionToDelete}'.`;
                    }else{
                        response = `The question '${questionToDelete}' is not found in my database.`;
                    }
                }catch(e){
                    logError(query, e);
                    response = `I'm sorry, but an error has occured while removing the question '${questionToDelete}'.`;
                }
            }
            else if((match = query.matchAll(/(Hapus pertanyaan )(.+)/gi)) && (groups = [...match]) && groups.length > 0){
                const questionToDelete = groups[0][3];
                logParse(groups[0][0], `as DBM-Delete query removing '${questionToDelete}'`);
                isDBMQuery = true;
                alsoLookInDB = false;

                // DBM query for removing question-answer pair
                try{
                    const succ = await sql.removeQuestion(questionToDelete);
                    if(succ){
                        response = `Successfully removed the question '${questionToDelete}'.`;
                    }else{
                        response = `The question '${questionToDelete}' is not found in my database.`;
                    }
                }catch(e){
                    logError(query, e);
                    response = `I'm sorry, but an error has occured while removing the question '${questionToDelete}'.`;
                }
            }

            if(!isDBMQuery){
                // Parse non-DBM queries only if no DBM queries are found
                if((match = query.match(/(?<!\S)\d{1,2}\/\d{1,2}\/\d{4}(?![\w/])/))){
                    logParse(match[0], 'as date query');
                    alsoLookInDB = false;

                    // Query for date
                    try{
                        const dayResult = findTheDay(match[0]);
                        response = `${match[0]} is a ${dayResult}.`;
                    }catch(e){
                        logError(query, e);
                        response = `I'm sorry, but ${match[0]} is not a valid date.`;
                    }
                }else if((match = query.match(/[\d+\-*/^()]+/))){
                    logParse(match[0], 'as mathexpr query');
                    alsoLookInDB = false;

                    // Query for mathexpr evaluation
                    try{
                        const evalResult = evaluate(match[0]);
                        response = `${match[0]} equals ${evalResult}.`;
                    }catch(e){
                        logError(query, e);
                        response = `I'm sorry, but ${match[0]} is not a valid expression.`;
                    }
                }else if(alsoLookInDB){
                    logParse(query, 'as a question');

                    // Query for question (db lookup)
                    const matches = await getResponseFor(query, algorithms.get(config.algorithm));
                    console.log('[INFO] Matches found:');
                    console.log(matches);
                    if(!matches || matches.length === 0){
                        response = 'Strange. For some reason, I\'m unable to find a response to your question. Would you like to add a question to my database? You can do so by typing \'Add question <question> with answer <answer>\'.';
                    }else if(matches.length === 1 && matches[0].match > 0.9){
                        response = matches[0].pattern.answer_pattern;
                    }else{
                        response = 'I\'m sorry, but did you mean:';
                        let i = 1;
                        for(const match of matches){
                            response += `\n${i++}. ${match.pattern.question_pattern}`;
                        }
                    }
                }
            }
        
            // Post-process response string
            response = Str.uwuifyText(response, config.uwuifyLevel);

            // Pack and store to database
            const timestamp = new Date();
            let chat = toChatObject(config.historyId, timestamp, query, response, config.algorithm);
            sql.addChat(chat.history_id, timestamp, chat.question, chat.answer, chat.algorithm);

            // Return response object
            resolve(chat);
        }
    });
}

/**
 * Constructs an object containing information about a single chat.
 * @param {number} historyId Identifier of the chat history this chat belongs to.
 * @param {Date} timestamp Timestamp of the chat.
 * @param {string} question The user query string.
 * @param {string} answer The response.
 * @param {string} algorithm The string-matching algorithm used in this chat.
 * @returns {{history_id: number, timestamp: Date, question: string, answer: string, algorithm: string}} The result object.
 */
function toChatObject(historyId, timestamp, question, answer, algorithm){
    if(typeof historyId !== 'number')throw new TypeError(`Expected number, got ${typeof historyId}`);
    if(!(timestamp instanceof Date))throw new TypeError(`Expected Date, got ${typeof timestamp}`);
    if(typeof question !== 'string')throw new TypeError(`Expected string, got ${typeof question}`);
    if(typeof answer !== 'string')throw new TypeError(`Expected string, got ${typeof answer}`);
    if(typeof algorithm !== 'string')throw new TypeError(`Expected string, got ${typeof algorithm}`);
    return {
        history_id: historyId,
        timestamp: timestamp,
        question: question,
        answer: answer,
        algorithm: algorithm
    }
}

/**
 * Stores configuration data for a user query request.
 */
class UserQueryConfig{
    #historyId = undefined;
    #algorithm = undefined;
    #requestNewHistoryId = false;
    #uwuifyLevel = 0;

    /**
     * Creates a configuration object with the specified data.
     * @param {number | undefined} historyId The chat history identifier. If none are specified, this configuration will be flagged to request a new identifier.
     */
    constructor(historyId = undefined){
        if(typeof historyId === 'number'){
            this.historyId = historyId;
        }else if(typeof historyId === 'undefined'){
            this.requestNewHistoryId = true;
        }else throw new TypeError(`Expected number|undefined, got ${typeof historyId}`);
        this.uwuifyLevel = 0;
    }

    /**
     * Identifier for the chat history containing the query.
     * @returns {number | undefined}
     */
    get historyId(){
        return this.#historyId;
    }

    set historyId(value){
        if(typeof value !== 'number')throw new TypeError(`Expected number, got ${typeof value}`);
        this.requestNewHistoryId = false;
        this.#historyId = value;
    }

    /**
     * What string-matching algorithm to use.
     * @returns {string}
     */
    get algorithm(){
        return this.#algorithm;
    }

    set algorithm(value){
        if(
            typeof value !== 'string'
            || !Array.from(algorithms.keys()).includes(value)
        )throw new TypeError(`Expected string, got ${typeof value}`);
        this.#algorithm = value;
    }

    /**
     * Whether to generate a unique chat history identifier for this query.
     * @returns {boolean}
     */
    get requestNewHistoryId(){
        return this.#requestNewHistoryId;
    }

    set requestNewHistoryId(value){
        if(typeof value !== 'boolean')throw new TypeError(`Expected boolean, got ${typeof value}`);
        if(value)this.#historyId = undefined;
        this.#requestNewHistoryId = value;
    }

    /**
     * Level of uwuification for the chat response.
     * @returns {number}
     */
    get uwuifyLevel(){
        return this.#uwuifyLevel;
    }

    set uwuifyLevel(value){
        if(typeof value !== 'number')throw new TypeError(`Expected number, got ${typeof value}`);
        this.#uwuifyLevel = Math.floor(value);
    }
}

/**
 * Fetches a response for a given query.
 * @param {string} query The query string to process.
 * @param {(text: string, pattern: string) => number} searchFunc The string-matching function to use.
 * @returns {Promise<{pattern: {question_pattern: string, answer_pattern: string}, match: number}[]>} The response string.
 */
async function getResponseFor(query, searchFunc){
    // Argument type check
    if(typeof query !== 'string')throw new TypeError(`Expected string, got ${typeof query}`);
    if(typeof searchFunc !== 'function')throw new TypeError(`Expected function, got ${typeof searchFunc}`);

    const qaPatterns = await sql.getQuestions();
    const qaMatch = [];

    for(const qaPattern of qaPatterns){
        if(searchFunc(query, qaPattern.question_pattern) !== -1){
            return [{
                pattern: qaPattern,
                match: 1
            }];
        }
        qaMatch.push({
            pattern: qaPattern,
            match: getSimilarityPercentage(query, qaPattern.question_pattern)
        });
    }

    qaMatch.sort((a, b) => b.match - a.match);
    console.log(qaMatch);
    if(qaMatch[0].match > 0.9)return [qaMatch[0]];
    return qaMatch.slice(0, 2);
}

/**
 * Logs a query segment parse message to the console.
 * @param {string} str The query segment to be parsed.
 * @param {string} msg Additional message about the parse process.
 */
function logParse(str, msg = undefined){
    if(typeof str !== 'string')throw new TypeError();
    if(typeof msg !== 'undefined' && typeof msg !== 'string')throw new TypeError();
    if(debugLevel < 2)return;

    let toLog = `[INFO] Parsing '${str}'`;
    if(typeof msg === 'string')toLog += ` ${msg}`;
    console.log(toLog);
}

/**
 * Logs an error to the console.
 * @param {string} query The query string that caused the error.
 * @param {Error} e The caught error.
 */
function logError(query, e){
    if(typeof query !== 'string' || typeof e !== 'object' || !(e instanceof Error))throw new TypeError();
    if(debugLevel < 1)return;
    console.log(`[WARN] Caught error while parsing:\n    Query: ${query}\n    Error: [${e.name}: ${e.message}]`);
}

module.exports = {algorithms, init, end, setDebugLevel, acceptUserQuery, toChatObject, UserQueryConfig};
