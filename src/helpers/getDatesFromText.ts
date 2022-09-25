export function getDatesFromText(text: string) {
  let dates: string[] = [];

  const regexp1 = /\d\.\d\.\d{4}/g;
  const regexp2 = /\d{2}\.\d{2}\.\d{4}/g;
  const regexp3 = /\d\/\d\/\d{4}/g;
  const regexp4 = /\d{2}\/\d{2}\/\d{4}/g;

  const result1 = text.match(regexp1);
  const result2 = text.match(regexp2);
  const result3 = text.match(regexp3);
  const result4 = text.match(regexp4);

  if (result1) {
    dates = [...dates, ...result1];
  }
  if (result2) {
    dates = [...dates, ...result2];
  }
  if (result3) {
    dates = [...dates, ...result3];
  }
  if (result4) {
    dates = [...dates, ...result4];
  }

  return dates.join(", ");
}
