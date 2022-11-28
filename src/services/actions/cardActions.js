export const trimmer = (word) => {
    for (let i = 0; i <= word.length - 5; i++) {
        word = word.replace(word[i], "*");
    }
    return word;
};

export const cvctrimmer = (cvc) => {
    for (let i = 0; i < cvc.length; i++) {
        cvc = cvc.replace(cvc[i], "*");
    }
    return cvc;
};