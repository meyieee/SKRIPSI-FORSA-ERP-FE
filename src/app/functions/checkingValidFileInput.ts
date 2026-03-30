const checkingValidImageInput = (file: File) => {
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
    const MAX_NAME_LENGTH = 50;
    
    if (file.size > MAX_SIZE || file.name.length > MAX_NAME_LENGTH) {
    alert("maximum photo size is 1MB and maximum photo name is 50 character");
      return false;
    }

    return true;
};

const checkingValidDocumentInput = (file: File) => {
    const MAX_SIZE = 20000000; // 20MB
    const MAX_NAME_LENGTH = 50;
    
    if (file.size > MAX_SIZE || file.name.length > MAX_NAME_LENGTH) {
    alert("maximum file size is 20Mb and maximum file name is 50 characater")
      return false;
    }

    return true;
};

export  {checkingValidImageInput, checkingValidDocumentInput}