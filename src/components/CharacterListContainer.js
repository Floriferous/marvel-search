import { connect } from 'react-redux';
import * as actions from '../actions/bookmarks';
import getClosestSearchResults from '../utils/getClosestSearchResults';

export const mapStateToProps = ({
  search,
  pagination,
  searchResults,
  bookmarks,
}) => {
  let data = {};
  let isLoading = false;
  if (search && pagination === 0) {
    ({ data, isLoading } = getClosestSearchResults(
      searchResults,
      search,
      pagination,
    ));
  } else {
    data.characters = Object.keys(bookmarks).map(bookmarkId => bookmarks[bookmarkId]);
  }

  // add bookmarks
  if (data.characters) {
    data.characters = data.characters.map(character => ({
      ...character,
      isBookmarked: !!bookmarks[character.id],
    }));
  }

  return {
    data,
    isSearching: !!search,
    isLoading,
  };
};

const CharacterListContainer = component =>
  connect(mapStateToProps, actions)(component);

export default CharacterListContainer;
