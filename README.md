# Vocabify App


<img width="1280" alt="screen shot 2017-11-16 at 03 15 54" src="https://user-images.githubusercontent.com/6935585/32872215-6bd169d2-ca7d-11e7-9ff2-0c97403adba9.png">

## Features
* Save interesting words you come across
* View definitions, examples, pronunciations and etymologies
* Remember definitions using spaced repetition
* Simple and elegant design
* Offline-first Progressive Web App

[View Feature Plan](https://github.com/paulbreslin/vocabify_app/projects/3)

## Anti-features
* Does not suggest words for you
* Does not require an email address to use

## Setup
Simply clone this repo and run `npm install && npm start`

## [Vocabify API](https://github.com/paulbreslin/vocabify_api)
* Acts as an intermediary between the Vocabify App and the [Oxford Dictionaries API](https://developer.oxforddictionaries.com/) (to format and reduce the size of the response)
* Allows users to sync words across devices (as words are stored in the browser by default)
