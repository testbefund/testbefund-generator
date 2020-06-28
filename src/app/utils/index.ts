export function partitionArray<T>(input: T[], spacing: number): Array<T[]> {
  const output: T[][] = [];
  for (let i = 0; i < input.length; i += spacing) {
    output[output.length] = input.slice(i, i + spacing);
  }
  return output;
}
