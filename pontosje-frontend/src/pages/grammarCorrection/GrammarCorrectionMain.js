import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { processHtmlContent } from "../../utils/grammarHtmlGenerator"
import { correctGrammar, setOriginalText } from '../../slices/grammarSlice';




const GrammarCorrectionMain = () => {

    const [editorHtml, setEditorHtml] = useState('');
    const [editorChanging, setEditorChanging] = useState(false);

    const dispatch = useDispatch();
    const userChangeRef = useRef(true);
    const quillRef = useRef(null);

    // const updateQuillContent = (newHtml) => {
    //     if (quillRef.current) {
    //         const quillEditor = quillRef.current.getEditor();
    //         quillEditor.setContents(quillEditor.clipboard.convert(newHtml));

    //         // setTimeout(() => {
    //         // quillEditor.focus();
    //         // quillEditor.setSelection(newValueObject.indexAfterInsertion, 0); // Adjust the selection if needed
    //         // }, 500);
    //     }
    // };

    const debouncedUpdate = useCallback(
        debounce((value) => {
            const proceddedHtml = processHtmlContent(value);

            dispatch(setOriginalText(proceddedHtml));
            dispatch(correctGrammar(proceddedHtml));
            // userChangeRef.current = false;// Indicate that the next change is programmatic
            // setEditorHtml(proceddedHtml);
            // updateQuillContent(proceddedHtml);
        }, 1000),
        [dispatch]
    );

    const handleEditorChange = (value) => {
        if (!userChangeRef.current) {
            userChangeRef.current = true;
            return;
        }
        setEditorChanging(true);
        setEditorHtml(value);
        debouncedUpdate(value);
    };

    // Effect to handle the content update with timeout
    // useEffect(() => {
    //     if (editorChanging && quillRef.current) {
    //         const quillEditor = quillRef.current.getEditor();
    //         const newValueObject = processHtmlContent(editorHtml);
    //         quillEditor.setContents(quillEditor.clipboard.convert(newValueObject));


    //         setTimeout(() => {
    //             quillEditor.focus();
    //             quillEditor.setSelection(newValueObject.indexAfterInsertion, 0);
    //         }, 500);
    //     }
    // }, [editorHtml, editorChanging]);

    return (
        <PerfectScrollbar
            style={{ width: '100%', height: '100%' }}
        >
            <ReactQuill
                ref={quillRef}
                value={editorHtml}
                modules={GrammarCorrectionMain.modules}
                formats={GrammarCorrectionMain.formats}
                onChange={handleEditorChange}
                style={{ width: '100%', height: '100%' }}
            />
        </PerfectScrollbar>
    );
};

// Define the modules and formats for ReactQuill
GrammarCorrectionMain.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
};

GrammarCorrectionMain.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default GrammarCorrectionMain;
