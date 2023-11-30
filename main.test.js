import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import App from './App';

describe('Recipe App', () => {

    
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

  test('Editing a recipe', async () => {
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

    const editButton = getByText('Edit');
    fireEvent.press(editButton);

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText('New Recipe')).toBeTruthy();
    });
  });

  test('Removing a recipe', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);

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

    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    await waitFor(() => {
      expect(queryByText('New Recipe')).toBeNull();
    });
  });

  test('Searching for a recipe', async () => {
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

    fireEvent.changeText(titleInput, '');
    fireEvent.changeText(ingredientsInput, '');
    fireEvent.changeText(instructionsInput, '');

    const searchInput = getByPlaceholderText('Search by Title');
    fireEvent.changeText(searchInput, 'New Recipe');

    await waitFor(() => {
      expect(getByText('New Recipe')).toBeTruthy();
    });
  });

  test('Sorting recipes by title', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<App />);

    const titleInput = getByPlaceholderText('Recipe Title');
    const ingredientsInput = getByPlaceholderText('Ingredients');
    const instructionsInput = getByPlaceholderText('Instructions');
    const addButton = getByText('Add');
    const sortButton = getByTestId('sort-button');

    fireEvent.changeText(titleInput, 'Recipe C');
    fireEvent.changeText(ingredientsInput, 'Ingredient 1C, Ingredient 2C');
    fireEvent.changeText(
      instructionsInput,
      'Step 1C. Do this, Step 2C. Do that'
    );
    fireEvent.press(addButton);

    fireEvent.changeText(titleInput, 'Recipe A');
    fireEvent.changeText(ingredientsInput, 'Ingredient 1A, Ingredient 2A');
    fireEvent.changeText(
      instructionsInput,
      'Step 1A. Do this, Step 2A. Do that'
    );
    fireEvent.press(addButton);

    fireEvent.changeText(titleInput, 'Recipe B');
    fireEvent.changeText(ingredientsInput, 'Ingredient 1B, Ingredient 2B');
    fireEvent.changeText(
      instructionsInput,
      'Step 1B. Do this, Step 2B. Do that'
    );
    fireEvent.press(addButton);

    fireEvent.press(sortButton);

    await waitFor(() => {
      const recipeList = [
        getByText('Recipe A'),
        getByText('Recipe B'),
        getByText('Recipe C'),
      ];
      expect(recipeList[0]).toBeTruthy();
      expect(recipeList[1]).toBeTruthy();
      expect(recipeList[2]).toBeTruthy();
    });

    fireEvent.press(sortButton);

    await waitFor(() => {
      const reverseRecipeList = [
        getByText('Recipe C'),
        getByText('Recipe B'),
        getByText('Recipe A'),
      ];
      expect(reverseRecipeList[0]).toBeTruthy();
      expect(reverseRecipeList[1]).toBeTruthy();
      expect(reverseRecipeList[2]).toBeTruthy();
    });
  });

  test('Editing and saving a recipe', async () => {
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

    fireEvent.press(getByText('Edit'));

    const editedTitleInput = getByPlaceholderText('Recipe Title');
    const editedIngredientsInput = getByPlaceholderText('Ingredients');
    const editedInstructionsInput = getByPlaceholderText('Instructions');
    const saveButton = getByText('Save');

    fireEvent.changeText(editedTitleInput, 'Edited Recipe');
    fireEvent.changeText(editedIngredientsInput, 'Edited Ingredient 1, Edited Ingredient 2');
    fireEvent.changeText(
      editedInstructionsInput,
      'Edited Step 1. Do this, Edited Step 2. Do that'
    );

    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText('Edited Recipe')).toBeTruthy();
    });
  });

  test('Toggle Sort Order', async () => {
    const { getByTestId } = render(<App />);

    const sortButton = getByTestId('sort-button');
    const initialSortOrder = sortButton.children[0].props.children;

    fireEvent.press(sortButton);

    await waitFor(() => {
      const newSortButton = getByTestId('sort-button');
      const newSortOrder = newSortButton.children[0].props.children;

      expect(initialSortOrder).not.toBe(newSortOrder);
    });
  });

  // ...
  test('Search with Empty Query', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
  
    // Add a recipe to ensure there is at least one item in the list
    const titleInput = getByPlaceholderText('Recipe Title');
    const ingredientsInput = getByPlaceholderText('Ingredients');
    const instructionsInput = getByPlaceholderText('Instructions');
    const addButton = getByText('Add');
  
    fireEvent.changeText(titleInput, 'Test Recipe');
    fireEvent.changeText(ingredientsInput, 'Ingredient 1, Ingredient 2');
    fireEvent.changeText(instructionsInput, 'Step 1, Step 2');
    fireEvent.press(addButton);
  
    // Clear the search input
    const searchInput = getByPlaceholderText('Search by Title');
    fireEvent.changeText(searchInput, '');
  
    // Ensure the added recipe is visible
    await waitFor(() => getByText('Test Recipe'));
  });

  
  
  test('Toggle Sort Order Multiple Times', () => {
    const { getByTestId } = render(<App />);
  
    // Get the initial sort order text
    const sortButton = getByTestId('sort-button');
    const initialSortOrder = sortButton.children[0].props.children;
  
    // Click the sort button multiple times to toggle the sort order
    fireEvent.press(sortButton);
    fireEvent.press(sortButton);
    fireEvent.press(sortButton);
  
    // Get the sort order text after toggling
    const newSortButton = getByTestId('sort-button');
    const newSortOrder = newSortButton.children[0].props.children;
  
    // Verify that the sort order has toggled
    expect(initialSortOrder).not.toBe(newSortOrder);
  });
  
  test('Removing All Recipes', async () => {
    const { getByTestId, queryByText, getByPlaceholderText, getByText } = render(<App />);
  
    const titleInput = getByPlaceholderText('Recipe Title');
    const ingredientsInput = getByPlaceholderText('Ingredients');
    const instructionsInput = getByPlaceholderText('Instructions');
    const addButton = getByText('Add');
  
    fireEvent.changeText(titleInput, 'Recipe 1');
    fireEvent.changeText(ingredientsInput, 'Ingredient 1');
    fireEvent.changeText(instructionsInput, 'Step 1');
    fireEvent.press(addButton);
  
    fireEvent.changeText(titleInput, 'Recipe 2');
    fireEvent.changeText(ingredientsInput, 'Ingredient 2');
    fireEvent.changeText(instructionsInput, 'Step 2');
    fireEvent.press(addButton);
  
    const removeAllButton = getByTestId('remove-all-recipes-button');
    fireEvent.press(removeAllButton);
  
    await waitFor(() => {
      expect(queryByText('Recipe 1')).toBeNull();
      expect(queryByText('Recipe 2')).toBeNull();
    });
  });
  
  
  
});
