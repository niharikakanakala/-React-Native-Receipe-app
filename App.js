import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedRecipeId, setEditedRecipeId] = useState(null);
  const [editedRecipeTitle, setEditedRecipeTitle] = useState('');
  const [editedRecipeIngredients, setEditedRecipeIngredients] = useState('');
  const [editedRecipeInstructions, setEditedRecipeInstructions] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortField, setSortField] = useState('title'); 

  const addRecipe = () => {
    if (recipeTitle.trim() !== '') {
      setRecipes([
        ...recipes,
        {
          id: Date.now(),
          title: recipeTitle,
          ingredients: recipeIngredients,
          instructions: recipeInstructions,
        },
      ]);
      setRecipeTitle('');
      setRecipeIngredients('');
      setRecipeInstructions('');
    }
  };

  const editRecipe = (recipeId) => {
    setEditMode(true);
    setEditedRecipeId(recipeId);
    const recipeToEdit = recipes.find((recipe) => recipe.id === recipeId);
    setEditedRecipeTitle(recipeToEdit.title);
    setEditedRecipeIngredients(recipeToEdit.ingredients);
    setEditedRecipeInstructions(recipeToEdit.instructions);
  };

  const saveEditedRecipe = () => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editedRecipeId
        ? {
            ...recipe,
            title: editedRecipeTitle,
            ingredients: editedRecipeIngredients,
            instructions: editedRecipeInstructions,
          }
        : recipe
    );
    setRecipes(updatedRecipes);
    setEditMode(false);
    setEditedRecipeId(null);
    setEditedRecipeTitle('');
    setEditedRecipeIngredients('');
    setEditedRecipeInstructions('');
  };

  const removeRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    setEditMode(false);
    setEditedRecipeId(null);
    setEditedRecipeTitle('');
    setEditedRecipeIngredients('');
    setEditedRecipeInstructions('');
  };

  const removeAllRecipes = () => {
    setRecipes([]);
    setEditMode(false);
    setEditedRecipeId(null);
    setEditedRecipeTitle('');
    setEditedRecipeIngredients('');
    setEditedRecipeInstructions('');
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Book</Text>
      <View style={styles.inputContainer}>
        {editMode ? (
          <>
            <TextInput
              style={styles.input}
              value={editedRecipeTitle}
              onChangeText={(text) => setEditedRecipeTitle(text)}
              placeholder="Recipe Title"
            />
            <TextInput
              style={styles.input}
              value={editedRecipeIngredients}
              onChangeText={(text) => setEditedRecipeIngredients(text)}
              placeholder="Ingredients"
            />
            <TextInput
              style={styles.input}
              value={editedRecipeInstructions}
              onChangeText={(text) => setEditedRecipeInstructions(text)}
              placeholder="Instructions"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveEditedRecipe}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Recipe Title"
              value={recipeTitle}
              onChangeText={(text) => setRecipeTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingredients"
              value={recipeIngredients}
              onChangeText={(text) => setRecipeIngredients(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Instructions"
              value={recipeInstructions}
              onChangeText={(text) => setRecipeInstructions(text)}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={addRecipe}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.searchAndSortContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Title"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={styles.sortButton}
          onPress={toggleSortOrder}
          testID="sort-button"
        >
          
          <Text style={styles.sortButtonText}>
         Sort {sortField === 'title' ? 'Title' : ''} {sortOrder === 'asc' ? '↑' : '↓'}
         </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeAllButton}
        onPress={removeAllRecipes}
        testID="remove-all-recipes-button"
      >
        <Text style={styles.removeAllButtonText}>Remove All Recipes</Text>
      </TouchableOpacity>
      <FlatList
        data={recipes
          .filter((recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => {
            if (sortField === 'title') {
              const compareResult = a.title.localeCompare(b.title);
              return sortOrder === 'asc' ? compareResult : -compareResult;
            }
            return 0;
          })}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeText}>{item.ingredients}</Text>
            <Text style={styles.recipeText}>{item.instructions}</Text>
            <View style={styles.buttonsContainer}>
              {editMode && editedRecipeId === item.id ? (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setEditMode(false);
                    setEditedRecipeId(null);
                    setEditedRecipeTitle('');
                    setEditedRecipeIngredients('');
                    setEditedRecipeInstructions('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editRecipe(item.id)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeRecipe(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchAndSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 8,
  },
  sortButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  sortButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeAllButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 16,
  },
  removeAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recipeItem: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 5,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeText: {
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'blue',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
