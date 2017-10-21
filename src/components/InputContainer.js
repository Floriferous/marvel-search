import { connect } from 'react-redux';
import * as actions from '../actions/search';

const InputContainer = component =>
  connect(({ search }) => ({ search }), actions)(component);

export default InputContainer;
