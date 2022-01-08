type InitFieldsType = {
  (fieldSize: number, initialPosition: { x: number; y: number }): string[][];
};

export const initFields: InitFieldsType = (fieldSize, initialPosition) => {
  const fields: string[][] = [];

  for (let i = 0; i < fieldSize; i++) {
    const cols: string[] = new Array<string>(fieldSize).fill('');
    fields.push(cols);
  }

  fields[initialPosition.y][initialPosition.x] = 'snake';

  return fields;
};
