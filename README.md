# Marvel Search

Search your favorite MARVEL characters, bookmark and save the ones you like.

## Table of Contents

- [Installation](#markdown-header-installation)
- [Code structure](#markdown-header-code-structure)
- [React component design](#markdown-header-react-component-design)
- [Redux design](#markdown-header-redux-design)
- [Search optimization](#markdown-header-search-optimization)
- [Tradeoffs and limitations](#markdown-header-tradeoffs-and-limitations)
- [Future work](#markdown-header-future-work)
- [Testing](#markdown-header-testing)

## Installation

- Clone the repo
- Start the app using `yarn start`

## Code structure

The code is structured as follows in the `src` folder:

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
    - contains all other JS used in the app, such as during testing, or other
    useful functions

Each folder with JS also contains its own `test` folder, where all the tests are located.

## React component design

- All of the React components are stateless components, with the exception of CharacterListContainer and InputContainer which are the only HOCs connecting to the redux store.
- The components adhere as much as possible to the 'single-responsibility' philosophy, where each component handles (ideally) only a single task.
- Each of the components has 100% code coverage.

## Redux design

While this is only my second project using `redux`, I'm starting to get a better grasp of it, while still lacking experience to properly separate concerns and use the more advanced constructs such as selectors (none of which were built).

The search results and bookmarks are all stored inside an object for O(1) querying when recursing to find the closest results (see search optimization).

- The store consists of 4 reducers:
    -`bookmarks`: handles the bookmarks in an object
    -`pagination`: handles the pagination (though not yet implemented in the app)
    -`search`: handles the search box and its value
    -`searchResults`: stores each previous search result as a combination of the search value and pagination

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

- App should be tested on Internet Explorer/Edge.
- Pagination was not implemented, however majority of the logic is ready.
- A React v16 ErrorBoundary component could be added to display errors properly. However when using react-scripts, it is overridden by a custom error so it didn't feel necessary.
- No integration or acceptance tests were written, but should be added as an additional layer of reliability.

## Testing

- Run tests in watch mode using `yarn test`

The last code coverage report is as following (and can be obtained by running `yarn test -- --coverage`):

|                             |  % Stmts | % Branch |  % Funcs |  % Lines |
|-----------------------------|----------|----------|----------|----------|
|All files                    |    79.65 |    73.83 |    77.27 |    88.66 |
