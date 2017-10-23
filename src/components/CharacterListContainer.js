import { connect } from 'react-redux';
import * as actions from '../actions/bookmarks';
import getClosestSearchResults from '../utils/getClosestSearchResults';
import constants from '../config/constants';

export const mapStateToProps = ({
  search,
  pagination,
  searchResults,
  bookmarks,
}) => {
  let data = {};
  let isLoading = false;
  if (search) {
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

  const currentOffset = pagination * constants.CHARACTERS_PER_PAGE;
  const showNext = currentOffset + constants.CHARACTERS_PER_PAGE < data.total;

  return {
    characters: data.characters,
    isSearching: !!search,
    isLoading,
    showPagination: data.total > constants.CHARACTERS_PER_PAGE,
    showNext,
  };
};

const CharacterListContainer = component =>
  connect(mapStateToProps, actions)(component);

export default CharacterListContainer;
