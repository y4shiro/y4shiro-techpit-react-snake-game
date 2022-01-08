export const initFields = (fieldSize: number): string[][] => {
  const fields: string[][] = [];

  for (let i = 0; i < fieldSize; i++) {
    const cols: string[] = new Array<string>(fieldSize).fill('');
    fields.push(cols);
  }

  // 仮置
  fields[17][17] = 'snake';
  fields[17][19] = 'food';

  return fields;
};
