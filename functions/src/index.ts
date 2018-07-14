import * as functions from 'firebase-functions';
import fetch, { Headers } from 'node-fetch';

exports.wordsAPI = functions.https.onCall(
  (data, context) =>
    new Promise(async (resolve, reject) => {
      const headers = new Headers();
      headers.append('X-Mashape-Key', functions.config().mashape.key);
      try {
        const request = await fetch(
          `https://wordsapiv1.p.mashape.com/words/${data.word}`,
          {
            headers
          }
        );
        const { ok } = request;
        const definitionResponse = await request.json();

        const hasDefinition = ok && Boolean(definitionResponse.results);

        resolve(
          hasDefinition
            ? definitionResponse.results.map((item, index) => {
                const { definition, examples, partOfSpeech } = item;
                const hasExample = Boolean(examples);
                const hasPartOfSpeech = Boolean(partOfSpeech);
                return {
                  definition,
                  example: hasExample ? examples[0] : null,
                  partOfSpeech: hasPartOfSpeech ? partOfSpeech : null,
                  enabled: index < 3
                };
              })
            : null
        );
      } catch (error) {
        reject(error);
        // TODO - Log error
      }
    })
);
