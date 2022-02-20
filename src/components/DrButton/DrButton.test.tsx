import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import DrButton from './DrButton';

describe('DrButton', () => {
  test('renders the DrButton component', () => {
    render(<DrButton label="Hello world!" />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
