import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { processHtmlContent } from "../../utils/grammarHtmlGenerator"
import { wrapWhiteSpaceErrors } from "../../utils/grammarErrorCorrection"
import { initializeWebSocketConnection, terminateWebSocketConnection, sendWebsocketMessage } from '../../slices//websocket/websocketSlice';
import GrammarErrorPopup from './GrammarErrorPopup';
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [errorInfo, setErrorInfo] = useState(null);

    const editorRef = useRef(null);
    const displayRef = useRef(null);
    const containerRef = useRef(null);



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeWebSocketConnection());

        return () => {
            dispatch(terminateWebSocketConnection());
        };
    }, [dispatch]);

    const debouncedUpdate = useCallback(
        debounce((value) => {

            const { errorHtml, hasErrors } = wrapWhiteSpaceErrors(value);
            console.log("Here we are!");
            setParsedHtmlContent(errorHtml);

            // dispatch(sendWebsocketMessage(value));
        }, 1000),
        [dispatch]
    );


    const handleEditorChange = useCallback((event) => {
        const content = event.target.innerHTML;

        const processedHtml = processHtmlContent(content);
        console.log("Stuff happening");

        setParsedHtmlContent(processedHtml);
        debouncedUpdate(processedHtml);

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



    const handleTopLayerMouseMoove = (event) => {
        if (displayRef.current) {
            const newEvent = new MouseEvent('mouseover', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: event.clientX,
                clientY: event.clientY
            });
            displayRef.current.dispatchEvent(newEvent);
        }
    };

    const handleTopLayerMouseClick = (event) => {
        if (displayRef.current) {
            const newEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: event.clientX,
                clientY: event.clientY
            });
            displayRef.current.dispatchEvent(newEvent);
        }
    };

    const handleBottomLayerMouseMove = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const grammarErrorElements = document.querySelectorAll('grammar-error');
        grammarErrorElements.forEach((element) => {
            const elementRect = element.getBoundingClientRect();

            const isMouseOver = (
                mouseX >= elementRect.left &&
                mouseX <= elementRect.right &&
                mouseY >= elementRect.top &&
                mouseY <= elementRect.bottom
            );

            if (isMouseOver) {
                element.classList.add('hovered');
            } else {
                element.classList.remove('hovered');
            }
        });
    };

    const handleBottomLayerClick = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const grammarErrorElements = document.querySelectorAll('grammar-error');
        grammarErrorElements.forEach((element) => {
            const elementRect = element.getBoundingClientRect();

            const isMouseOver = (
                mouseX >= elementRect.left &&
                mouseX <= elementRect.right &&
                mouseY >= elementRect.top &&
                mouseY <= elementRect.bottom
            );

            if (isMouseOver) {
                console.log("Clicked on a <grammar-error> tag", element);
                setAnchorEl(element); // Set the clicked element as the anchor
                setErrorInfo({
                    type: element.getAttribute('data-type'),
                    replaceWith: element.getAttribute('data-replace-with')
                });
            }
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
        setErrorInfo(null);
    };


    return (
        <div style={{ position: 'relative', height: '100%', width: "100%", overflow: "auto" }}>
            <div
                ref={displayRef}
                onMouseOver={handleBottomLayerMouseMove}
                onClick={handleBottomLayerClick}
                style={{
                    ...commonEditorStyle,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    pointerEvents: 'none'
                }}
                dangerouslySetInnerHTML={{ __html: parsedhtmlContent }}
            />
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorChange}
                onMouseMove={handleTopLayerMouseMoove}
                onClick={handleTopLayerMouseClick}
                style={{
                    ...commonEditorStyle,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    cursor: 'text',
                    caretColor: 'blue',
                    color: 'transparent',
                    zIndex: 101
                }}
            />

            <GrammarErrorPopup
                errorInfo={errorInfo}
                anchorEl={anchorEl}
                onClose={handleClose}
            />

        </div>

    );
};

export default GrammarCorrectionMain;