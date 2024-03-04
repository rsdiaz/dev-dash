export function bytesToGigabytes(bytes: any): string {
  const gigabytes = bytes / Math.pow(1024, 3);
  return gigabytes.toFixed(2);
}