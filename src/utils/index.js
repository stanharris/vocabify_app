// @flow

// TODO - Replace with Cloud function
export const fetchDefinition = (word: string) => {
  return new Promise(async (resolve, reject) => {
    const headers = new Headers();
    headers.append(
      'X-Mashape-Key',
      'sGDbkk4oV4mshtHSJqX6FoPtRvrmp1S9XCqjsnzSWWhDPeohMt'
    );
    try {
      const response = await fetch(
        `https://wordsapiv1.p.mashape.com/words/${word}`,
        {
          headers
        }
      );
      const { ok } = response;

      if (ok) {
        const data = await response.json();
        resolve(data);
      } else {
        resolve({
          error: true
        });
      }
    } catch (error) {
      reject();
      // TODO - Log error
    }
  });
};
