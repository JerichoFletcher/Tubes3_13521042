import { isNumeric } from './num';
import Stack from './stack';

const OP_TYPE_ARITHMETIC = 'arithmetic';
const OP_TYPE_BRACKET = 'bracket'
const BRACKET_TYPE_LEFT = 'left';
const BRACKET_TYPE_RIGHT = 'right';

const operators = {
    '+': {
        token: '+',
        type: OP_TYPE_ARITHMETIC,
        priority: 1,
        evaluate: (x1, x2) => x1 + x2,
        toString: () => '+'
    },
    '-': {
        token: '-',
        type: OP_TYPE_ARITHMETIC,
        priority: 1,
        evaluate: (x1, x2) => x1 - x2,
        toString: () => '-'
    },
    '*': {
        token: '*',
        type: OP_TYPE_ARITHMETIC,
        priority: 2,
        evaluate: (x1, x2) => x1 * x2,
        toString: () => '*'
    },
    '^': {
        token: '^',
        type: OP_TYPE_ARITHMETIC,
        priority: 3,
        evaluate: (x1, x2) => x1 ** x2,
        toString: () => '^'
    },
    '/': {
        token: '/',
        type: OP_TYPE_ARITHMETIC,
        priority: 2,
        evaluate: (x1, x2) => x1 / x2,
        toString: () => '/'
    },
    '(': {
        token: '(',
        type: OP_TYPE_BRACKET,
        bracketType: BRACKET_TYPE_LEFT,
        bracketPair: ')',
        toString: () => '('
    },
    ')': {
        token: ')',
        type: OP_TYPE_BRACKET,
        bracketType: BRACKET_TYPE_RIGHT,
        bracketPair: '(',
        toString: () => ')'
    }
}

/**
 * Evaluates a mathematical expression and calculates its numerical value.
 * @param {string} str The expression to evaluate.
 * @throws Will throw an error if the argument is not a valid expression string.
 * @returns {number} The value of the expression.
 */
function evaluate(str){
    // Argument type check
    if(typeof str !== 'string'){
        throw new TypeError('Evaluate non-string argument');
    }

    const valStack = new Stack();
    const opsStack = new Stack();

    // Iterate through every character in the expression
    let num = null
    for(const ch of str){
        if(isNumeric(ch)){
            // Read number
            num = parseFloat(ch) + (num !== null ? 10 * num : 0);
        }else{
            // Token is not a number: push last read number
            if(num !== null){
                valStack.push(num);
                num = null;
            }

            // Determine operator
            const curr_op = operators[ch]
            if(typeof curr_op === 'undefined')throw new EvalError(`Invalid expression: invalid token ${ch} in ${str}`);

            if(curr_op.type === OP_TYPE_ARITHMETIC){
                // Arithmetic operator: evaluate preceding higher-priority operators
                if(!opsStack.isEmpty){
                    let last_op = opsStack.peek();
                    while(!opsStack.isEmpty && last_op.type === OP_TYPE_ARITHMETIC && last_op.priority >= curr_op.priority){
                        try{
                            const x1 = valStack.pop();
                            const x2 = valStack.pop();

                            valStack.push(last_op.evaluate(x2, x1));
                            opsStack.pop();
                            if(!opsStack.isEmpty)last_op = opsStack.peek();
                        }catch(e){
                            throw new EvalError(`Invalid expression: invalid token ${ch} in ${str}: ${e}`);
                        }
                    }
                }
                // Push this operator into the stack
                opsStack.push(curr_op);

            }else if(curr_op.type === OP_TYPE_BRACKET){
                // Bracket operator: handle open and close brackets separately
                if(curr_op.bracketType === BRACKET_TYPE_LEFT){
                    // Left bracket: push into the stack
                    opsStack.push(curr_op);
                }else if(curr_op.bracketType === BRACKET_TYPE_RIGHT){
                    // Right bracket: evaluate preceding operators until a matching left bracket is found
                    if(opsStack.isEmpty)throw new EvalError(`Invalid expression: no left bracket of ${ch} in ${str}`);

                    let last_op = opsStack.peek();
                    while(last_op.type !== OP_TYPE_BRACKET){
                        try{
                            const x1 = valStack.pop();
                            const x2 = valStack.pop();

                            valStack.push(last_op.evaluate(x2, x1));
                            opsStack.pop();
                            last_op = opsStack.peek();
                        }catch(e){
                            throw new EvalError(`Invalid expression: invalid token ${ch} in ${str}: ${e}`);
                        }
                    }
                    if(last_op.bracketPair !== ch)throw new EvalError(`Invalid expression: mismatched bracket of ${ch} in ${str}`);
                    opsStack.pop();
                }else{
                    throw new Error(`Unknown operator type for ${ch} in ${str}`);
                }
            }else{
                throw new Error(`Unknown operator type for ${ch} in ${str}`);
            }
        }
    }

    // Push the last read number
    if(num !== null)valStack.push(num);
    while(!opsStack.isEmpty){
        let last_op = opsStack.peek();
        if(last_op.type === OP_TYPE_ARITHMETIC){
            try{
                const x1 = valStack.pop();
                const x2 = valStack.pop();

                valStack.push(last_op.evaluate(x2, x1));
                opsStack.pop();
                if(!opsStack.isEmpty)last_op = opsStack.peek();
            }catch(e){
                throw new EvalError(`Invalid expression: invalid token ${last_op.token} in ${str}: ${e}`);
            }
        }else if(last_op.type === OP_TYPE_BRACKET){
            throw new EvalError(`Invalid expression: unclosed bracket ${last_op.token} in ${str}`);
        }else{
            throw new Error(`Unknown operator type for ${last_op.token} in ${str}`);
        }
    }

    // Finished if only one number is left in the stack
    if(valStack.length !== 1)throw new EvalError("Invalid expression: not enough operators");
    return valStack.pop();
}

export default evaluate;
