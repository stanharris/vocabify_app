import flattenDeep from 'lodash/flattenDeep';

export const fetchDefinition = async word => {
  return new Promise(async (resolve, reject) => {
    const apiUrl =
      'https://od-api.oxforddictionaries.com:443/api/v1/entries/en';
    const headers = new Headers();
    headers.append('app_id', process.env.APP_ID);
    headers.append('app_key', process.env.APP_KEY);
    try {
      const response = await fetch(`${apiUrl}/${word}`, {
        headers
      });
      const data = await response.json();
      const wordData = data.results.map(result =>
        result.lexicalEntries.map(lexicalEntry => {
          const { lexicalCategory } = lexicalEntry;
          const filteredList = lexicalEntry.entries[0].senses.filter(
            sense => Boolean(sense.definitions) || Boolean(sense.examples)
          );
          const formattedList = filteredList.map(sense => {
            const { definitions, examples } = sense;
            const hasDefinition = Boolean(definitions);
            const hasExample = Boolean(examples);
            const definition = hasDefinition ? definitions[0] : undefined;
            const example = hasExample ? examples[0].text : undefined;
            return {
              definition,
              example
            };
          });
          return {
            lexicalCategory,
            definitionList: formattedList
          };
        })
      );
      if (
        flattenDeep(wordData).every(item => item.definitionList.length === 0)
      ) {
        reject();
        // res.sendStatus(404);
      } else {
        resolve(flattenDeep(wordData));
        // res.send(flattenDeep(wordData));
      }
    } catch (error) {
      console.log(error);
      // TODO - Add better error handling
      reject();
    }
  });
};
