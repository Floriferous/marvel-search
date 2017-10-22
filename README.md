# Marvel Search

Search your favorite MARVEL characters, bookmark and save the ones you like.

## Table of Contents

- [Installation](#Installation)
- [Tradeoffs and limitations](#tradeoffs-and-limitations)
- [Future work](#future-work)
- [Testing](#testing)

## Installation

- Clone the repo
- Start the app using `yarn start`

## Search optimization

- Each search result is being cached in the `searchResults` reducer. When an additional character is typed, it returns the most recent result from the API, to avoid showing results, followed by a loading screen, then followed by results again.
- When searching, previous results are checked to make search a new query is useful. If a previous result returned an empty array, a new query is not being made.
- Since all queries to the MARVEL API are made with `startingWith` the `name` field. If a new character is typed and it still matches all previous names, a new query will not be issued. As an example, if `cap` returned `Captain America` and `Captain Africa`, typing `capt` will not trigger a new query. A new query will only be issued when searching for `captain aX`.

## Tradeoffs and limitations

- A fetch for characters is currently issued for every unique search query. As a query becomes more precise, the overlap between results becomes significant, however additional searches are still being issued.

## Future work

The app can be improved in several ways, following is a list of possible additions:


## Testing

- Run tests in watch mode using `yarn test`
