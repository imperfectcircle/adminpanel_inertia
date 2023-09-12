export const inputHandler = (event, setInputText) => {
    const lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
};
