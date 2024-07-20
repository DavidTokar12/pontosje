// src/grammarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const correctGrammar = createAsyncThunk(
    'grammar/correctGrammar',
    async (text) => {
        console.log('Posing: ', text);
        const response = await api.post('/correct_grammar/', { text });
        console.log('Response: ', response);
        return response.data;
    }
);

const grammarSlice = createSlice({
    name: 'grammar',
    initialState: {
        originalText: '',
        correctionText: '',
        corrections: {}, // { [componentId]: { correctionType, correctedText } }
        timestamp: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setOriginalText: (state, action) => {
            state.originalText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(correctGrammar.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(correctGrammar.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.correctionText = action.payload.correctionText;
                state.corrections = action.payload.corrections;
                state.timestamp = action.payload.timestamp;
                console.log('corrections', state.corrections);
            })
            .addCase(correctGrammar.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.error('Error:', action.error.message);
            });
    },
});

export const selectCorrections = (state) => state.grammar.corrections;
export const selectCorrectionText = (state) => state.grammar.correctionText;
export const selectTimestamp = (state) => state.grammar.timestamp;
export const selectOriginalText = (state) => state.grammar.originalText;
export const selectGrammarStatus = (state) => state.grammar.status;
export const selectGrammarError = (state) => state.grammar.error;

export const { setOriginalText } = grammarSlice.actions;

export default grammarSlice.reducer;
