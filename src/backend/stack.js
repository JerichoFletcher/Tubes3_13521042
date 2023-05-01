/**
 * A collection where elements can only be inserted to and removed from the end of the collection (the top of the stack).
 */
class Stack{
    /**
     * Creates an empty stack.
     */
    constructor(){
        this.element = {};
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
        this.element[++this.top] = x;
    }

    /**
     * Removes and returns the item at the top of the stack.
     * @returns {any} The item at the top of the stack.
     * @throws Will throw an error if the stack is empty.
     */
    pop(){
        const x = this.peek();
        delete this.element[this.top--];
        return x;
    }

    /**
     * Gets the current item at the top of the stack.
     * @returns {any} The item at the top of the stack.
     * @throws Will throw an error if the stack is empty.
     */
    peek(){
        if(this.isEmpty){
            throw new Error("Stack is empty");
        }
        return this.element[this.top];
    }
}

export default Stack;
