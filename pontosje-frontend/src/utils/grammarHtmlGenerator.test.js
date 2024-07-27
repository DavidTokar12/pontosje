import { processHtmlContent } from './grammarHtmlGenerator';
import { largeInputHTML } from './grammarHtmlGeneratorInputs';

test('Test large html parsing', () => {
    const result = processHtmlContent(largeInputHTML);
    expect(result).toBeDefined();
});
