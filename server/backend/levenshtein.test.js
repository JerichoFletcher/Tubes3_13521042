import getSimilarityPercentage from "./levenshtein.js"

test('Levenshtein: test1, evaluate getSimilarityPercentage should return 1 where string1 and string2 are the same',() => {
    const string1 = "supercalifragilisticexpialidocious";
    const string2 = "supercalifragilisticexpialidocious";
    const expected = 1;
    expect(getSimilarityPercentage(string1,string2)).toStrictEqual(expected); 
})

test('Levenshtein: test2, evaluate getSimilarityPercentage should return 0 where string1 and string2 are completely different',() => {
    const string1 = "abcd";
    const string2 = "efgh";
    const expected = 0;
    expect(getSimilarityPercentage(string1,string2)).toStrictEqual(expected); 
})

test('Levenshtein: test3, getSimilarityPercentage should return 0<x<1 where string1 and string2 have some similar character',() => {
    const string1 = "john";
    const string2 = "jonny";
    const expected = 0.6;
    expect(getSimilarityPercentage(string1,string2)).toStrictEqual(expected); 
})

test('Levenshtein: test4, getSimilarityPercentage should return 1 where both string1 and string2 are empty string',() => {
    const string1 = "";
    const string2 = "";
    const expected = 1;
    expect(getSimilarityPercentage(string1,string2)).toStrictEqual(expected); 
})

test('Levenshtein: test5, getSimilarityPercentage should return 0 where one of string1 or string2 are empty string',() => {
    const string1 = "";
    const string2 = "yowbro";
    const expected = 0;
    expect(getSimilarityPercentage(string1,string2)).toStrictEqual(expected); 
})

test('Levenshtein: test6, getSimilarityPercentage should return error where type of string1 or string2 is not string',() => {
    const string1 = 1;
    const string2 = "supercalifragilisticexpialidocious";
    const expected = 1;
    expect(()=>getSimilarityPercentage(string1,string2)).toThrow(); 
})