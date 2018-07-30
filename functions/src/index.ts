import * as functions from 'firebase-functions';
import fetch, { Headers } from 'node-fetch';
import * as _ from 'lodash';

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
                  enabled: index === 0
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

exports.oxford = functions.https.onCall(
  (data, context) =>
    new Promise(async (resolve, reject) => {
      const headers = new Headers();
      headers.append('app_id', functions.config().oxford.app_id);
      headers.append('app_key', functions.config().oxford.app_key);
      try {
        const request = await fetch(
          `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${
            data.word
          }`,
          { headers }
        );
        const response = await request.json();
        const wordData = response.results.map(result =>
          result.lexicalEntries.map(lexicalEntry => {
            const filteredList = lexicalEntry.entries[0].senses.filter(sense =>
              Boolean(sense.definitions)
            );
            const formattedList = filteredList.map(sense => {
              const { definitions, examples } = sense;
              const hasDefinition = Boolean(definitions);
              const hasExample = Boolean(examples);
              return hasDefinition
                ? {
                    definition: definitions[0],
                    example: hasExample ? examples[0].text : null
                  }
                : null;
            });
            return formattedList;
          })
        );
        const flattenedList = _.flattenDeep(wordData);
        const hasDefinitions = Boolean(flattenedList.length);
        if (hasDefinitions) {
          // Enable first definition
          resolve(
            flattenedList.map((item, index) => {
              return {
                ...item,
                enabled: index === 0
              };
            })
          );
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
        // TODO - Log error
      }
    })
);
