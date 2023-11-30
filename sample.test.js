import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import App from './App';


 test('Adding a recipe', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    const titleInput = getByPlaceholderText('Recipe Title');
    const ingredientsInput = getByPlaceholderText('Ingredients');
    const instructionsInput = getByPlaceholderText('Instructions');
    const addButton = getByText('Add');

    fireEvent.changeText(titleInput, 'New Recipe');
    fireEvent.changeText(ingredientsInput, 'Ingredient 1, Ingredient 2');
    fireEvent.changeText(
      instructionsInput,
      'Step 1. Do this, Step 2. Do that'
    );

    fireEvent.press(addButton);

    await waitFor(() => {
      expect(getByText('New Recipe')).toBeTruthy();
    });
  });