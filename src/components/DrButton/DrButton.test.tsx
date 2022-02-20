import React from 'react';
import {render} from '@testing-library/react';

import DrButton from './DrButton';

describe('DrButton', () => {
  test('renders the DrButton component', () => {
    render(<DrButton label="Hello world!" />);
  });
});
