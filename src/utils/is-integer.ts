export default function isInteger(s: string): boolean {
  return /^\+?[1-9]\d*$/.test(s);
}
