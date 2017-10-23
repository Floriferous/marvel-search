import { createSearchKey } from '../actions/search';

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

  // Return immediately if search length equals 1 or pagination is larger than 0
  if (search.length === 1 || pagination > 0) {
    return {
      data: searchResults[createSearchKey(search, pagination)] || {},
      isLoading: false, // taken care of by CharacterList
    };
  }

  for (let i = 0; i < search.length; i += 1) {
    const broaderSearch = search.slice(0, search.length - i);
    broaderResults = searchResults[createSearchKey(broaderSearch, pagination)];
    if (broaderResults) {
      isExactSearch = i === 0;
      break;
    }
  }
  return { data: broaderResults || {}, isLoading: !isExactSearch };
};

export default getClosestSearchResults;
