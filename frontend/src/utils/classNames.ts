export function cx(...classNames: string[]): string {
  return classNames.filter(Boolean).join(' ')
}
