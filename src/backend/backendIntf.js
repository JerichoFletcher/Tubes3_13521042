import { uwuifyText } from "./string";
import evaluate from "./calculator";
import findTheDay from "./calendar";
import kmp from "./kmp";
import bmMatch from "./boyermoore";

/**
 * A map of available string-matching algorithms.
 */
export const algorithms = new Map([
    ['KMP', kmp],
    ['BM', bmMatch]
]);

/**
 * Receives a user query and returns the appropriate response.
 * @param {string} query User query to evaluate.
 * @param {UserQueryConfig} config Configuration for the current user query.
 * @returns {Promise<{history_id: number, timestamp: Date, question: string, answer: string, algorithm: string}>} A chat object containing information about the chat response.
 */
export async function acceptUserQuery(query, config){
    return new Promise((resolve, reject) => {
        // Argument type check
        if(typeof query !== 'string')reject(new TypeError());
        if(typeof config !== 'object' || !(config instanceof UserQueryConfig))reject(new TypeError());

        // Process query and get response string
        /** @todo Process query */
        query = query.trim().toLowerCase().replace(/\s+/, ' ');
        let response, groups, match;
        let isDBMQuery = false, alsoLookInDB = true;

        // Prioritize parsing DBM queries
        if((match = query.matchAll(/(Add question )([\s\w']+)( with answer )([\s\w']+)/gi)) && (groups = [...match]) && groups.length > 0){
            const newQuestion = groups[0][2];
            const newAnswer = groups[0][4];
            logParse(groups[0][0], `as DBM-Add/Update query updating '${newQuestion}': '${newAnswer}'`);
            isDBMQuery = true;
            alsoLookInDB = false;

            // DBM query for adding question-answer pair
            response = `Successfully added the question '${newQuestion}' with the answer '${newAnswer}'.`;
            /** @todo Add question-answer pair to database */
        }else if((match = query.matchAll(/(Remove question )([\s\w']+)/gi)) && (groups = [...match]) && groups.length > 0){
            const questionToDelete = groups[0][2];
            logParse(groups[0][0], `as DBM-Delete query removing '${questionToDelete}'`);
            isDBMQuery = true;
            alsoLookInDB = false;

            // DBM query for removing question-answer pair
            response = `Successfully removed the question '${questionToDelete}'.`;
            /** @todo Remove question from database */
        }

        if(!isDBMQuery){
            // Parse non-DBM queries only if no DBM queries are found
            if((match = query.match(/(?<!\S)\d{1,2}\/\d{1,2}\/\d{4}(?![\S])/))){
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
            }else if((match = query.match(/[\d+\-*/()]+/))){
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
                /** @todo Lookup response from database */
                response = query;
            }
        }
        
        // Post-process response string
        response = uwuifyText(response, config.uwuifyLevel);

        let chat = toChatObject(config.historyId, new Date(), query, response, config.algorithm);

        // Return response object
        resolve(chat);
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
export function toChatObject(historyId, timestamp, question, answer, algorithm){
    if(
        typeof historyId !== 'number'
        || !(timestamp instanceof Date)
        || typeof question !== 'string'
        || typeof answer !== 'string'
        || typeof algorithm !== 'string'
    )throw new TypeError();
    return {
        history_id: historyId,
        timestamp: timestamp,
        question: question,
        answer: answer,
        algorithm: algorithm
    }
}

/**
 * Logs a query segment parse message to the console.
 * @param {string} str The query segment to be parsed.
 * @param {string} msg Additional message about the parse process.
 */
function logParse(str, msg = undefined){
    if(typeof str !== 'string')throw new TypeError();
    if(typeof msg !== 'undefined' && typeof msg !== 'string')throw new TypeError();

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
    console.log(`[WARN] Caught error while parsing:\n    Query: ${query}\n    Error: [${e.name}: ${e.message}]`);
}

/**
 * Stores configuration data for a user query request.
 */
export class UserQueryConfig{
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
        }else throw new TypeError();
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
        if(typeof value !== 'number')throw new TypeError();
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
        )throw new TypeError();
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
        if(typeof value !== 'boolean')throw new TypeError();
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
        if(typeof value !== 'number')throw new TypeError();
        this.#uwuifyLevel = Math.floor(value);
    }
}
