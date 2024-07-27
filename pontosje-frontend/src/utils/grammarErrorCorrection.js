function wrapWhiteSpaceErrors(htmlText) {
    let hasErrors = false;

    // Match sequences of two or more spaces or tabs
    let spaceTabPattern = /([ \t]{2,})/g;
    // Match sequences of two or more <div><br></div> tags
    let divBrPattern = /((<div><br><\/div>){2,})/g;

    // Replace the matches with the <grammar-error> wrapped text including type and replace-with attributes
    htmlText = htmlText.replace(spaceTabPattern, (match) => {
        hasErrors = true;
        return `<grammar-error type="replace" replace-with=" ">${match}</grammar-error>`;
    });

    htmlText = htmlText.replace(divBrPattern, (match) => {
        hasErrors = true;
        return `<grammar-error type="replace" replace-with="<div><br></div>">${match}</grammar-error>`;
    });

    return { errorHtml: htmlText, hasErrors };
}
export { wrapWhiteSpaceErrors };