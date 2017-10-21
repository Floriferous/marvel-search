import React from 'react';

import Input from './Input';
import CharacterList from './CharacterList';
import Disclaimer from './Disclaimer';

const HomePage = () => (
  <main>
    <h1>Marvel Search</h1>
    <Input />
    <CharacterList />
    <Disclaimer />
  </main>
);

export default HomePage;
