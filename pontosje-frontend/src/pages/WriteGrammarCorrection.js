import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { throttle, debounce } from 'lodash';
import CryptoJS from 'crypto-js';
import Tokenizer from 'sentence-tokenizer';

const WriteGrammarCorrection = ({ navbarHeight }) => {
    const [editorHtml, setEditorHtml] = useState('');
    const [editorHeight, setEditorHeight] = useState('');

    const calculateEditorHeight = useCallback(() => {
        const height = `calc(100vh - ${navbarHeight}px)`;
        setEditorHeight(height);
    }, [navbarHeight]);
    const debouncedHandleChange = useCallback(
        debounce((html) => {
            setEditorHtml(html);
            sendToBackend(html);
        }, 2000),
        []
    );
    const handleResize = useCallback(() => {
        calculateEditorHeight();
    }, [calculateEditorHeight]);
    const throttledHandleResize = useCallback(
        throttle(handleResize, 300),
        [handleResize]
    );
    useEffect(() => {
        calculateEditorHeight();
        window.addEventListener('resize', throttledHandleResize);

        return () => {
            window.removeEventListener('resize', throttledHandleResize);
            debouncedHandleChange.cancel();
            throttledHandleResize.cancel();
        };
    }, [calculateEditorHeight, debouncedHandleChange, throttledHandleResize]);


    const generateIdFromText = (text) => {
        return CryptoJS.MD5(text.trim()).toString();
    };

    const processHtmlContent = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const tokenizer = new Tokenizer('Hungarian');

        const wrapper = doc.createElement('div');
        wrapper.id = generateIdFromText(doc.body.textContent || 'full-text');

        doc.body.querySelectorAll('*').forEach((element) => {
            const newWrapper = doc.createElement('div');
            newWrapper.id = generateIdFromText(element.textContent || 'element');

            // Wrap text nodes within this element
            element.childNodes.forEach((childNode) => {
                if (childNode.nodeType === Node.TEXT_NODE) {
                    const text = childNode.textContent;
                    tokenizer.setEntry(text);
                    const sentences = tokenizer.getSentences();

                    sentences.forEach((sentence) => {
                        if (sentence.trim()) {
                            const sentenceWrapper = doc.createElement('span');
                            sentenceWrapper.id = generateIdFromText(sentence);
                            sentenceWrapper.textContent = sentence;
                            newWrapper.appendChild(sentenceWrapper);
                        }
                    });
                } else {
                    newWrapper.appendChild(childNode.cloneNode(true));
                }
            });

            wrapper.appendChild(newWrapper);
        });

        doc.body.innerHTML = '';
        doc.body.appendChild(wrapper);

        const updatedHtml = doc.body.innerHTML;

        console.log(updatedHtml);
        return updatedHtml;
    };

    processHtmlContent(editorHtml);

    const sendToBackend = async (content) => {
        try {
            const response = await axios.post('http://localhost:8000/api/text-content/', { content });
            console.log('Response from Django API:', response.data);
            checkTaskStatus(response.data.task_id);
        } catch (error) {
            console.error('Error sending data to Django:', error);
        }
    };

    const checkTaskStatus = async (taskId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/task_status/${taskId}`);
            const data = response.data;

            if (data.status === 'SUCCESS') {
                console.log(`Task completed with result: ${data.result}`);
            } else {
                console.log('Task is still pending...');
                setTimeout(() => checkTaskStatus(taskId), 1000); // Poll every second
            }
        } catch (error) {
            console.error('Error checking task status:', error);
        }
    };

    return (
        <div style={{ display: 'flex', height: editorHeight }}>
            <div style={{ width: '300px', borderRight: '1px solid #ddd' }}>
                <p>Left column content</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                <ReactQuill
                    value={editorHtml}
                    onChange={debouncedHandleChange}
                    modules={WriteGrammarCorrection.modules}
                    formats={WriteGrammarCorrection.formats}
                    style={{ flex: 1, overflow: 'auto' }}
                />

            </div>
        </div>
    );
};

export default WriteGrammarCorrection;
