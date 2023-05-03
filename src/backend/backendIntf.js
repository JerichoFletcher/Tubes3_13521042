import { uwuifyText } from "./string";
import evaluate from "./calculator";
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
        let response, match;
        if((match = query.match(/(?<!\S)\d{1,2}\/\d{1,2}\/\d{4}(?=[^0-9a-zA-Z_])/g))){
            // Query for date
        }else if((match = query.match(/[\d+\-*/()]+/g))){
            // Query for mathexpr evaluation
            response = evaluate(match[0]);
        }
        
        // Post-process response string
        if(config.uwuify){
            response = uwuifyText(response);
        }

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
 * Stores configuration data for a user query request.
 */
export class UserQueryConfig{
    #historyId = undefined;
    #algorithm = undefined;
    #requestNewHistoryId = false;
    #uwuify = false;

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
        this.uwuify = false;
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
     * Whether to uwuify the response text.
     * @returns {boolean}
     */
    get uwuify(){
        return this.#uwuify;
    }

    set uwuify(value){
        if(typeof value !== 'boolean')throw new TypeError();
        this.#uwuify = value;
    }
}
