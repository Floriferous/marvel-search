import { connect } from 'react-redux';
import * as actions from '../actions/search';

const PaginationContainer = component =>
  connect(({ pagination }) => ({ pagination }), actions)(component);

export default PaginationContainer;
