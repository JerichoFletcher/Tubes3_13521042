/**
 * Receives a user query and returns the appropriate response.
 * @param {string} query User query to evaluate.
 * @param {UserQueryConfig} config Configuration for the current user query.
 * @returns {Promise<string>} A response string.
 */
export async function acceptUserQuery(query, config){
    return new Promise((resolve, reject) => {
        // Argument type check
        if(typeof query !== 'string')reject(new TypeError());
        if(typeof config !== 'object' || !(config instanceof UserQueryConfig))reject(new TypeError());

        // Simulate database query
        /** @todo Process query */
        setTimeout(() => resolve(query), 500);
    });
}

/**
 * Stores configuration data for a user query request.
 */
export class UserQueryConfig{
    #historyId = -1;
    #requestNewHistoryId = false;

    /**
     * Creates a configuration object with the specified data.
     * @param {number | undefined} historyId The chat history identifier.
     */
    constructor(historyId = undefined){
        if(typeof historyId === 'number'){
            this.historyId = historyId;
        }else if(typeof historyId === 'undefined'){
            this.requestNewHistoryId = true;
        }else throw new TypeError();
    }

    /**
     * Identifier for the chat history containing the query.
     */
    get historyId(){
        return this.#historyId;
    }

    set historyId(value){
        if(typeof value !== 'number')throw new TypeError();
        if(value >= 0)this.requestNewHistoryId = false;
        this.#historyId = value;
    }

    /**
     * Whether to generate a unique chat history identifier for this query.
     */
    get requestNewHistoryId(){
        return this.#requestNewHistoryId;
    }

    set requestNewHistoryId(value){
        if(typeof value !== 'boolean')throw new TypeError();
        if(value)this.historyId = -1;
        this.#requestNewHistoryId = value;
    }
}
