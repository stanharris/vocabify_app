export type DefinitionList = {
  definition: string,
  example: string
};

export type Word = {
  word: string,
  definitionList: Array<DefinitionList> | null,
  id: string,
  reviewDate: Date,
  reviewInterval: number
};
