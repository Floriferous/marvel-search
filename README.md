# Marvel Search

Search for your favorite MARVEL characters, bookmark and save the ones you like. For true MARVEL fans only.

## Table of Contents

- [Installation](#markdown-header-installation)
- [Code structure](#markdown-header-code-structure)
- [App design](#markdown-header-app-design)
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

# App design

In the spirit of superheroes and comic books, I wanted the app to be big, bold, and playful. This was created by the MARVEL-like `Bangers` font, large font-sizes, and big 300x450 images that take up a lot of space. MARVEL's art is beautiful and should be enjoyed by the fans that would use an app like this.

MARVEL's iconic brand color is used in the header and for bookmarked heroes, and should resonate with the fans.

Beyond that, an aesthetically clean palette with a pleasant contrast (soft-black on white and grey) was used, combined with bold hover effects to create a simple but elegant experience.

The massive search input starts off with an `autoFocus` to quickly draw the user's attention to the simple and main functionality of the app, for an incredible UX (/joke).

## React component design

- All of the React components are stateless components, with the exception of CharacterListContainer and InputContainer which are the only HOCs connecting to the redux store.
- The components adhere as much as possible to the 'single-responsibility' philosophy, where each component handles (ideally) only a single task.
- Each of the components has 100% code coverage.


## Redux design

While this is only my second project using `redux`, I'm starting to get a better grasp of it, but still lack experience to properly separate concerns and use the more advanced constructs such as selectors (none were used).

The search results and bookmarks are all stored inside an object for O(1) querying when recursing to find the closest results (see search optimization).

- The store consists of 4 reducers:
    - `bookmarks`: handles the bookmarks in an object
    - `pagination`: handles the pagination increments, decrement and resets
    - `search`: handles the search box and its value
    - `searchResults`: stores each previous search result as a combination of the search value and pagination


## Search optimization

Most of the app is fairly straight-forward, so where most of the optimization happens is in search. It's optimized both for UX with caching, and to limit network requests to preserve data.

- Each search result is cached in the `searchResults` reducer. When an additional character is typed - and before the exact results come back from the server - it returns the most recent superset result from the API, to avoid showing results, followed by a loading screen, then followed by results again.
- When searching, previous results are checked to make sure a new query is truly necessary. If a previous result returned an empty array, a new query is not being made.
- Since all queries to the MARVEL API are made with `startingWith` the `name` field. If a new character is typed and it still matches all previous names, a new query will not be issued.
    - As an example, if `cap` returned `Captain America` and `Captain Africa`, typing `capt` will not trigger a new query. A new query will only be issued when searching for `captain aX`.
- When pagination is larger than 0, exact results are expected and therefore fetched every time, the results are still cached and can be visited subsequently


## Tradeoffs and limitations

- Almost all of the CSS relies on flexbox, which will break the layout on IE < 10. I consider this acceptable for MARVEL tech-savvy nerds :)
- There are certainly more of these, mostly related to redux (which I don't yet know enough of), and more clever usage of MARVEL's API.


## Future work

The app can be improved in several ways, following is a list of possible additions:

- App should be tested on Internet Explorer/Edge.
- A React v16 ErrorBoundary component could be added to display errors properly. However when using react-scripts, it is overridden by a custom error so it didn't feel necessary.
- No integration or acceptance tests were written, but should be added as an additional layer of reliability.
- The entire store could be persisted to localStorage for fast reusability on subsequent visits. Each query weighs about 2kB in the store, so with a 5MB limit on localStorage, one could save more than 2000 queries without worrying about exceeding the limit.
- One could always pre-fetch one extra pagination, so that the user does not have to wait. So on the visit of page 1, already fetch page 2. As with most search engines, I assume users to find their result on the first page the majority of the time, so it might not be that useful for most users.
- It should be possible to perform a more optimal name comparison for subsequent searches, and instead of refetching all of the characters, search for a subset of them and merge them with the previous request. This may be overkill for an app that fetches only 12 characters, and the server delay should - normally - remain the same.

## Testing

- Run tests in watch mode using `yarn test`

The last code coverage report is as following (and can be obtained by running `yarn test -- --coverage`):

|                             |  % Stmts | % Branch |  % Funcs |  % Lines |
|-----------------------------|----------|----------|----------|----------|
|All files                    |    95.12 |    93.14 |    98.31 |    97.35 |
