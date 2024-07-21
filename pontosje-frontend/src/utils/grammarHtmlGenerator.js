import Tokenizer from 'sentence-tokenizer';
import CryptoJS from 'crypto-js';

const generateIdFromText = (text, type, index) => {
    return CryptoJS.MD5(`${type}_${text.trim()}_${index}`).toString();
};

const processHtmlContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tokenizer = new Tokenizer('Hungarian');
    const wrapper = doc.createElement('full-text');

    const bodyText = Array.from(doc.body.childNodes)
        .map(node => node.textContent || '')
        .join(' ')
        .trim();
    const fullTextId = generateIdFromText(bodyText, 'full-text', 0);
    wrapper.id = fullTextId;


    doc.body.querySelectorAll('*').forEach((element) => {
        const elementText = element.textContent || '';
        tokenizer.setEntry(elementText);

        const sentences = tokenizer.getSentences();

        sentences.forEach((sentence, sentenceIdx) => {
            if (sentence.trim()) {
                const sentenceWrapper = doc.createElement('sentence');
                sentenceWrapper.id = generateIdFromText(sentence, 'sentence', sentenceIdx);

                const words = sentence.split(/\s+/);

                words.forEach((word, wordIdx) => {
                    if (word.trim()) {
                        const wordWrapper = doc.createElement('word');
                        wordWrapper.id = generateIdFromText(word, 'word', wordIdx);
                        wordWrapper.textContent = word;
                        sentenceWrapper.appendChild(wordWrapper);
                    }
                });
                wrapper.appendChild(sentenceWrapper);
            }
        });
    });

    doc.body.innerHTML = '';
    doc.body.appendChild(wrapper);

    const updatedHtml = doc.body.innerHTML;

    return updatedHtml;
};

export {
    processHtmlContent,
};
