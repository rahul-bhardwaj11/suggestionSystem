export declare class Trie {
    constructor(input?: string[]);
    addWord(word: string): this;
    removeWord(word: string): this;
    getWords(): string[];
    getPrefix(strPrefix: string): string[];
}
