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

## Search strategy

- Each search result is being cached in the `searchResults` reducer. When an additional character is typed, it returns the most recent result from the API, to avoid showing results, followed by a loading screen, then followed by results.
- When a previous search returns nothing, each subsequent character will not trigger a new unnecessary search (this assumes MARVEL's API behaves accordingly).

## Tradeoffs and limitations

- A fetch for characters is currently issued for every unique search query. As a query becomes more precise, the overlap between results becomes significant, however additional searches are still being issued.

## Future work

The app can be improved in several ways, following is a list of possible additions:

-

## Testing

- Run tests in watch mode using `yarn test`
