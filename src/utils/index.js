// @flow

// This is for requests which HAVE to run server-side,
// i.e. because the request includes an API key

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

      resolve(ok ? definitionResponse.results : null);
    } catch (error) {
      reject();
      // TODO - Log error
    }
  });

export { fetchDefinition };
