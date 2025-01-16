import numeral from "numeral";

export default function numberFormat(inputValue: number): string {
  return numeral(inputValue)
    .format(inputValue > 1000 ? "0.00a" : "0a")
    .toUpperCase();
}
