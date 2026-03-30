export const checkInputAutoNumberFormat = (docNoGenerate: any, docNoInput: any ) => {
    const docNoGenerateSplit: any[] = docNoGenerate.split('-');
    const docNoInputSplit: any[] = docNoInput!.split('-');
    if(docNoInputSplit[0] === docNoGenerateSplit[0]) {
        if (docNoGenerateSplit[1] === docNoInputSplit[1]) {
            return null;
        } else {
            return "Cannot skip auto number increment.";
        }
    } else {
        return null;
    }
}