import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const WriteGrammarCorrection = () => {
    const [editorHtml, setEditorHtml] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const handleChange = (html) => {
        setEditorHtml(html);
        clearTimeout(timeoutId);
        const id = setTimeout(() => {
            sendToBackend(html);
        }, 2000);
        setTimeoutId(id);
    };

    const sendToBackend = async (content) => {
        try {
            const response = await axios.post('http://localhost:8000/api/text-content/', { content });
            console.log('Response from Django API:', response.data);
        } catch (error) {
            console.error('Error sending data to Django:', error);
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    return (
        <div>
            <h2>Írjon egy új bejegyzést</h2>
            <ReactQuill
                value={editorHtml}
                onChange={handleChange}
                modules={WriteGrammarCorrection.modules}
                formats={WriteGrammarCorrection.formats}
            />
        </div>
    );
};

WriteGrammarCorrection.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['clean']
    ],
};

WriteGrammarCorrection.formats = [
    'header', 'font', 'size',
    'list', 'bullet', 'bold', 'italic', 'underline',
    'link', 'image'
];

export default WriteGrammarCorrection;
