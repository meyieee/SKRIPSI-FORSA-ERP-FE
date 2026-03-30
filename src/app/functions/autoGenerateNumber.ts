// ----- NOTE (PROBLEMS W/ THIS CODE) -----
// 1. doesn't reset the increment when the month/year changes (FIXED)
// 2. only finds code in the last index of array (will be a problem if user edits the code value) (FIXED)
// 		ex. if row MR2402-002 is edited as MR01 by user, then this function won't work properly
//		info: if latest generated code is MR2402-004 but user edits it as MR01, then the next item to be created is still MR2402-004
//					if existing item w/ code MR2402-004 is deleted, then the next item to be created is not MR2404-004, but the latest index
// 3. doesn't regard adding the first two digit numbers after 009, as it still reads as two first zero digits (FIXED)
// 4. the array code field is not dynamic (FIXED)
// 5. IDK what happens to the code if the user lightly modifies the auto no
//		ex. auto gen code is MR2402-004, but the user edited it to MR2402-006. then the next auto generated no is MR2402-007, not MR2402-005

export default function autoNumber(data: any, code: string) {
	// Define a regex pattern to match any two letters followed by 4 digits, a dash, and 3 digits
	const pattern = /^[A-Z]{2}\d{4}-\d{3}$/;
	const sortedData = data?.sort((a: { id: number }, b: { id: number }) => a.id - b.id); // in case the data order is scattered
	
	// Iterate over the array of values
	let codePatternTest = null;
	for (let i = sortedData?.length - 1; i >= 0; i--) {
		// Test if the current value matches the pattern
		if (pattern.test(sortedData[i]?.[code])) {
			codePatternTest = sortedData[i]?.[code]; // Return the value if it matches the pattern
			break;
		}
	}
	
	const splitCode = (data?.length > 0 && codePatternTest !== null) && codePatternTest.split("-") // result: ['MR2134', '000'] (sample value)
	
	let splitCodeNo = Number(splitCode?.[1]) // result: 9 (sample value)
	let splitCodeDate = splitCode?.[0]?.split("").slice(2).join('') // result: '2134' (sample value)
	let stringNum;
	let lastDigit;

	function getTwoDigitYear(): string {
    const year = new Date().getFullYear().toString();
    return year.slice(-2);
  }

  function getTwoDigitMonth(): string {
    const month = (new Date().getMonth() + 1).toString();
    return month.length === 1 ? `0${month}` : month;
  }

  const year = getTwoDigitYear();
  const month = getTwoDigitMonth();
	const newDate = `${year}${month}`

	// Checks if the code year & month === today's year & month
	if(newDate === splitCodeDate && data?.length > 0) {
		lastDigit = splitCodeNo + 1
		stringNum = lastDigit?.toString().padStart(lastDigit < 999 ? 3 : 4, '0')
		return stringNum
	} else {
		lastDigit = 1
		stringNum = lastDigit?.toString().padStart(3, '0')
		return stringNum
	}
}