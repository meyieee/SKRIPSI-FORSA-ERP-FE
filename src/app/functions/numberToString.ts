export default function numberToWords(value:any) {
  const digits = [" ","one","two","three","four","five","six","seven","eight","nine"];
  const teens = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens = ['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const bigs = ['','thousand','million', 'billion','trillion'];

  value = value?.toString().replace(/[\, ]/g, "")
  if (isNaN(value)) return "not a number";
  let divider = value.indexOf(".");
  if (divider === -1) divider = value.length;
  if (divider > 15) return "too big";
  let num = value.split("");
  let result = "";
  let sk = 0;

  for (let index = 0; index < divider; index++) {
    if ((divider - index) % 3 === 2) {
      if (num[index] === "1") {
        result += teens[Number(num[index + 1])] + " ";
        index++;
        sk = 1;
      } else if (num[index] !== 0) {
        result += tens[num[index] - 2] + " ";
        sk = 1;
      }
    } else if (num[index] !== 0) {
      result += digits[num[index]] + " ";

      if ((divider - index) % 3 === 0 ) result += "hundred ";
      // result += " ";
      sk = 1;
    }
    if ((divider - index) % 3 === 1) {
      if (sk) result += bigs[(divider - index - 1) / 3] + " ";
      sk = 0;
    }
  }

  if (divider !== value.length) {
    let y = value.length;
    result += "point ";
    for (let index = divider + 1; index < y; index++) result += digits[num[index]] + " ";
  }
  return result.replace(/\s+/g, " ");
}
