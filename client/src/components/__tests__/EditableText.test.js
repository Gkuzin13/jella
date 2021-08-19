import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import EditableText from '../EditableText';

describe('EditableText', () => {
  test('should change and update correctly', () => {
    const dataUpdateFunc = jest.fn();
    render(<EditableText dataText={'Hello'} dataUpdateFunc={dataUpdateFunc} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('Hello'), {
      target: { value: 'Hello changed' },
    });

    expect(screen.getByDisplayValue('Hello changed')).toBeInTheDocument();

    fireEvent.blur(screen.getByDisplayValue('Hello changed'));

    expect(dataUpdateFunc).toBeCalledTimes(1);
  });

  test('should not submit if no changes made', () => {
    const dataUpdateFunc = jest.fn();
    render(<EditableText dataText={'Hello'} dataUpdateFunc={dataUpdateFunc} />);

    fireEvent.change(screen.getByDisplayValue('Hello'), {
      target: { value: 'Hello' },
    });

    fireEvent.blur(screen.getByDisplayValue('Hello'));
    expect(dataUpdateFunc).toBeCalledTimes(0);
  });
});
