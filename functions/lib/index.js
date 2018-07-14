"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const node_fetch_1 = require("node-fetch");
exports.wordsAPI = functions.https.onCall((data, context) => new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
    const headers = new node_fetch_1.Headers();
    headers.append('X-Mashape-Key', functions.config().mashape.key);
    try {
        const request = yield node_fetch_1.default(`https://wordsapiv1.p.mashape.com/words/${data.word}`, {
            headers
        });
        const { ok } = request;
        const definitionResponse = yield request.json();
        const hasDefinition = ok && Boolean(definitionResponse.results);
        resolve(hasDefinition
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
            : null);
    }
    catch (error) {
        reject(error);
        // TODO - Log error
    }
})));
//# sourceMappingURL=index.js.map