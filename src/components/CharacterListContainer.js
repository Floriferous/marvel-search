import { connect } from 'react-redux';
import { createSearchKey } from '../actions/search';
import * as actions from '../actions/bookmarks';

/**
 * getClosestSearchResults - Searches for the closest search results
 * currently in memory. It iterates on a search string, and removes one
 * character at a time until it finds an old search result to display.
 *
 * If the first run passes, it simply returns the exact search results.
 *
 * An isLoading flag is also returned, to indicate whether old or exact
 * results are currently being returned
 *
 * @param {Object} searchResults Object with all previous search results
 * @param {String} search        current search string
 * @param {String} pagination    current pagination
 *
 * @return {Object}
 */
const getClosestSearchResults = (searchResults, search, pagination) => {
  let broaderResults;
  let isExactSearch;

  // Return immediately if search length equals 1
  if (search.length === 1) {
    return {
      characters: searchResults[createSearchKey(search, pagination)],
      isLoading: false, // taken care of by CharacterList
    };
  }

  // Only iterate until search is one character, else it will look for
  // an empty key
  for (let i = 0; i < search.length - 1; i += 1) {
    const broaderSearch = search.slice(0, search.length - i);
    broaderResults = searchResults[createSearchKey(broaderSearch, pagination)];
    if (broaderResults) {
      isExactSearch = i === 0;
      break;
    }
  }
  return { characters: broaderResults, isLoading: !isExactSearch };
};

const mapStateToProps = ({
  search, pagination, searchResults, bookmarks,
}) => {
  let characters;
  let isLoading = false;
  if (search) {
    ({ characters, isLoading } = getClosestSearchResults(
      searchResults,
      search,
      pagination,
    ));
  } else {
    characters = Object.keys(bookmarks).map(bookmarkId => bookmarks[bookmarkId]);
  }

  return {
    characters,
    isSearching: !!search,
    isLoading,
  };
};

const CharacterListContainer = component =>
  connect(mapStateToProps, actions)(component);

export default CharacterListContainer;
