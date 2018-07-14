export type DefinitionList = {
  definition: string,
  example: string,
  partOfSpeech: string,
  enabled: boolean
};

export type Word = {
  word: string,
  definitionList: Array<DefinitionList> | null,
  id: string,
  reviewDate: Date,
  reviewInterval: number
};

export type DefinitionSource = {
  id: string,
  name: string,
  enabled: boolean
};

export type ErrorType = {
  hasError: boolean,
  errorMessage: string
};
