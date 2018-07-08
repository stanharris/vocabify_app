// @flow

// This is for requests which HAVE to run server-side,
// i.e. because the request includes an API key
// Or, when there are multiple clients which share the same logic, then it
// should be moved to a Cloud function

// TODO - Replace with Cloud function
const fetchDefinition = (word: string) =>
  new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append(
      'X-Mashape-Key',
      'sGDbkk4oV4mshtHSJqX6FoPtRvrmp1S9XCqjsnzSWWhDPeohMt'
    );
    try {
      const request = await fetch(
        `https://wordsapiv1.p.mashape.com/words/${word}`,
        {
          headers
        }
      );
      const { ok } = request;
      const definitionResponse = await request.json();

      const hasDefinition = ok && Boolean(definitionResponse.results);

      resolve(
        hasDefinition
          ? definitionResponse.results.map(item => {
              const { definition, examples, partOfSpeech } = item;
              const hasExample = Boolean(examples);
              const hasPartOfSpeech = Boolean(partOfSpeech);
              return {
                definition,
                example: hasExample ? examples[0] : null,
                partOfSpeech: hasPartOfSpeech ? partOfSpeech : null
              };
            })
          : null
      );
    } catch (error) {
      reject();
      // TODO - Log error
    }
  });

export { fetchDefinition };
