import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { processHtmlContent } from "../../utils/grammarHtmlGenerator"
import { initializeWebSocketConnection, terminateWebSocketConnection, sendWebsocketMessage } from '../../slices//websocket/websocketSlice';
import { minHeight } from '@mui/system';
import './grammarCorrectionStyles.css';

const commonEditorStyle = {
    minHeight: '100%',
    width: '100%',
    fontSize: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    overflow: 'auto',
    padding: '10px',
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
};

const GrammarCorrectionMain = () => {
    const [parsedhtmlContent, setParsedHtmlContent] = useState('');

    const editorRef = useRef(null);
    const displayRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeWebSocketConnection());

        return () => {
            dispatch(terminateWebSocketConnection());
        };
    }, [dispatch]);

    const debouncedUpdate = useCallback(
        debounce((value) => {
            dispatch(sendWebsocketMessage(value));
        }, 1000),
        [dispatch]
    );

    useEffect(() => {
        debouncedUpdate(parsedhtmlContent);
    }, [parsedhtmlContent]);



    const handleEditorChange = useCallback((event) => {
        const content = event.target.innerHTML;

        const processedHtml = processHtmlContent(content);
        setParsedHtmlContent(processedHtml);
    }, []);


    const handlePaste = useCallback((event) => {
        event.preventDefault();
        const clipboardData = event.clipboardData || window.clipboardData;
        const text = clipboardData.getData('text');
        document.execCommand('insertText', false, text);
    }, []);

    useEffect(() => {
        const editorElement = editorRef.current;
        if (editorElement) {
            editorElement.addEventListener('paste', handlePaste);
            return () => {
                editorElement.removeEventListener('paste', handlePaste);
            };
        }
    }, [handlePaste]);

    return (
        <div style={{ position: 'relative', height: '100%', width: "100%", overflow: "auto" }}>
            <div
                style={{
                    ...commonEditorStyle,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 100
                }}
                dangerouslySetInnerHTML={{ __html: parsedhtmlContent }}
            />
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorChange}
                style={{
                    ...commonEditorStyle,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    cursor: 'text',
                    caretColor: 'blue',
                    color: 'lightgray',
                }}
            />
        </div>
    );
};

export default GrammarCorrectionMain;