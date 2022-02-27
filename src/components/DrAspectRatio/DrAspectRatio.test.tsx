import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import DrAspectRatio from './DrAspectRatio';

describe('DrAspectRatio', () => {
  test('renders the DrAspectRatio component', () => {
    render(
      <DrAspectRatio ratio="4:3">
        <div>I'm 4:3</div>
      </DrAspectRatio>,
    );
    expect(screen.getByText(/4:3/i)).toBeInTheDocument();
  });
});
