import { connect } from 'react-redux';
import * as actions from '../actions/bookmarks';
import getClosestSearchResults from '../utils/getClosestSearchResults';

export const mapStateToProps = ({
  search,
  pagination,
  searchResults,
  bookmarks,
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

  const charactersWithBookmarks =
    characters &&
    characters.map(character => ({
      ...character,
      isBookmarked: !!bookmarks[character.id],
    }));

  return {
    characters: charactersWithBookmarks,
    isSearching: !!search,
    isLoading,
  };
};

const CharacterListContainer = component =>
  connect(mapStateToProps, actions)(component);

export default CharacterListContainer;
