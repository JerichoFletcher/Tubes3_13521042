/**
 * A collection where elements can only be inserted to and removed from the end of the collection (the top of the stack).
 */
class Stack{
    /**
     * Creates an empty stack.
     */
    constructor(){
        this.elements = {};
        this.top = -1;
    }

    /**
     * The number of items in the stack.
     */
    get length(){
        return this.top + 1;
    }

    /**
     * Whether the stack has no items currently stored.
     */
    get isEmpty(){
        return this.top < 0;
    }

    /**
     * Inserts a new item at the top of the stack.
     * @param {any} x The item to insert.
     */
    push(x){
        this.elements[++this.top] = x;
    }

    /**
     * Removes and returns the item at the top of the stack.
     * @returns {any} The item at the top of the stack.
     * @throws Will throw an error if the stack is empty.
     */
    pop(){
        const x = this.peek();
        this.elements[this.top--] = undefined;
        return x;
    }

    /**
     * Gets the current item at the top of the stack.
     * @returns {any} The item at the top of the stack.
     * @throws Will throw an error if the stack is empty.
     */
    peek(){
        if(this.isEmpty){
            throw new RangeError("Stack is empty");
        }
        return this.elements[this.top];
    }

    /**
     * Reverses the order of items in the stack, so the first item becomes the stack top.
     */
    reverse(){
        for(let i = 0; i < this.top / 2; i++){
            let swap = this.top - i;
            const temp = this.elements[i];
            this.elements[i] = this.elements[swap];
            this.elements[swap] = temp;
        }
    }

    /**
     * Returns the string representation of this stack.
     * @returns A string representing the current state of the stack.
     */
    toString(){
        let ret = '[';
        for(let i = 0; i <= this.top; i++){
            if(i < this.top){
                ret += `${this.elements[i]} `;
            }else{
                ret += `| ${this.elements[i]}`;
            }
        }
        return ret + ']';
    }

    /**
     * Returns an array containing all items in this stack.
     * @returns {any[]} A copy of the underlying array of this stack.
     */
    toArray(){
        const temp = [];
        for(let i = 0; i <= this.top; i++){
            temp.push(this.elements[i]);
        }
        return temp;
    }
}

export default Stack;
