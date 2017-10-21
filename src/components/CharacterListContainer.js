import { connect } from 'react-redux';
import { createSearchKey } from '../actions/search';

const mapStateToProps = ({
  search, pagination, searchResults, bookmarks,
}) => ({
  characters: search
    ? searchResults[createSearchKey(search, pagination)]
    : bookmarks,
  isBookmark: !!search,
});

const CharacterListContainer = component => connect(mapStateToProps)(component);

export default CharacterListContainer;
