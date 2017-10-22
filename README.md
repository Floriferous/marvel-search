# Marvel Search

Search your favorite MARVEL characters, bookmark and save the ones you like.

## Table of Contents

- [Installation](#markdown-header-installation)
- [Code structure](#markdown-code-structure)
- [Search optimization](#markdown-header-search-optimization)
- [Tradeoffs and limitations](#markdown-header-tradeoffs-and-limitations)
- [Future work](#markdown-header-future-work)
- [Testing](#markdown-header-testing)

## Installation

- Clone the repo
- Start the app using `yarn start`

## Code structure

The code is structured as follows, withing the `src` folder:

- `actions/`
    - contains all action creators
- `api/`
    - contains all methods to access the MARVEL API
- `components/`
    - contains all React components
- `config/`
    - contains all config files such as constants that the app relies on
- `css/`
    - contains the CSS, the app is considered small enough to fit all the CSS
    in one file
- `reducers/`
    - contains all the redux reducers
- `store/`
    - contains the redux store creator
- `utils/`
    - contains all other js used in the app, such as during testing, or other
    useful functions


## Search optimization

Most of the app is fairly straight-forward, so where most of the optimization happens is in search. It's optimized both for UX with caching, and to limit network requests to preserve data.

- Each search result is being cached in the `searchResults` reducer. When an additional character is typed, it returns the most recent result from the API, to avoid showing results, followed by a loading screen, then followed by results again.
- When searching, previous results are checked to make search a new query is useful. If a previous result returned an empty array, a new query is not being made.
- Since all queries to the MARVEL API are made with `startingWith` the `name` field. If a new character is typed and it still matches all previous names, a new query will not be issued.
    - As an example, if `cap` returned `Captain America` and `Captain Africa`, typing `capt` will not trigger a new query. A new query will only be issued when searching for `captain aX`.

## Tradeoffs and limitations

- The name lookup search optimization is only performed on the 12 initial results, any subsequent ones, which would be visited through pagination will therefore not necessarily match the exact search results (since the exact search is a subset of all previous searches, this shouldn't ever filter out possible characters).
    - This can be solved by fetching exact results upon visiting anything but the first page of results, which should be exact (if it turns out there are exactly 12 results, this might trigger a weird UX flicker that automatically goes back to page 0)
- Almost all of the CSS relies on flexbox, which will break the layout on IE < 10. I consider this acceptable for MARVEL tech-savvy nerds :)

## Future work

The app can be improved in several ways, following is a list of possible additions:

- App should be tested on Internet Explorer/Edge
- Pagination was not implemented, however majority of the logic is ready

## Testing

- Run tests in watch mode using `yarn test`
