import Tokenizer from 'sentence-tokenizer';
import CryptoJS from 'crypto-js';

const generateIdFromText = (text, type, index) => {
    return `${type}_${index}_${CryptoJS.MD5(`${type}_${text.trim()}_${index}`).toString()}`;
};


const processHtmlContent = (htmlText) => {

    htmlText = wrappTagglesContent(htmlText);

    const htmlParser = new DOMParser();
    const htmlDoc = htmlParser.parseFromString(htmlText, 'text/html');

    const wrapper = htmlDoc.createElement('full-text');

    const bodyText = Array.from(htmlDoc.body.childNodes)
        .map(node => node.textContent || '')
        .join(' ')
        .trim();
    const fullTextId = generateIdFromText(bodyText, 'full-text', 0);

    wrapper.id = fullTextId;

    htmlDoc.body.childNodes.forEach((childNode, _) => {

        const clonedChild = childNode.cloneNode(true);

        wrapWordsAndSentences(clonedChild, htmlDoc);

        wrapper.appendChild(clonedChild);
    });

    htmlDoc.body.innerHTML = '';
    htmlDoc.body.appendChild(wrapper);

    const updatedHtml = htmlDoc.body.innerHTML;
    return updatedHtml;
};

function wrapWordsAndSentences(node, htmlDoc, sentenceIdx = 0, wordIdx = 0) {

    if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent;

        const sentenceRegex = /[^.!?]+[.!?]?/g;
        const sentences = textContent.match(sentenceRegex) || [textContent];

        const fragment = htmlDoc.createDocumentFragment();

        sentences.forEach((sentence, sentIdx) => {
            if (sentence) {
                const sentenceWrapper = htmlDoc.createElement('sentence');
                sentenceWrapper.id = generateIdFromText(sentence, 'sentence', sentenceIdx + sentIdx);

                const words = sentence.split(/(\s+)/);
                words.forEach((word, wordIndex) => {
                    if (/\S/.test(word)) {
                        const wordWrapper = htmlDoc.createElement('word');
                        wordWrapper.id = generateIdFromText(word, 'word', wordIdx);
                        wordWrapper.textContent = word;
                        sentenceWrapper.appendChild(wordWrapper);
                    } else {
                        sentenceWrapper.appendChild(htmlDoc.createTextNode(word));
                    }
                });

                fragment.appendChild(sentenceWrapper);
            } else {
                fragment.appendChild(htmlDoc.createTextNode(sentence));
            }
        });

        node.replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(child => wrapWordsAndSentences(child, htmlDoc, sentenceIdx, wordIdx));
    }
};

const wrappTagglesContent = (html) => {
    // Regular expression to match text nodes that are not inside tags
    const regex = /(?<!<[^>]*)\s*[^<>]+\s*(?![^<]*>)/g;

    return html.replace(regex, (match) => `<div>${match}</div>`);
};



export {
    processHtmlContent,
};
