import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utilities/actions';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from '../../utilities/queries';

// Provider Global Store import
// Commented out in favor of Redux logic
// import { useStoreContext } from '../../utilities/GlobalState';

import { useDispatch, useSelector } from 'react-redux';

// Import IndexDB helper for database communication
import { idbPromise } from '../../utilities/helpers';

function CategoryMenu() {
  // Before migrating to the global store
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  // Commented out in favor of Redux logic
  // const [state, dispatch] = useStoreContext();
  const stateSelector = useSelector((state) => {
    return state;
  });
  const dispatchAction = useDispatch();

  const { categories } = stateSelector;
  // 'loading' will be used for offline capabilities
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // Update the state with the categories upon page load or change
  useEffect(() => {
    // 'loading' will be used for offline capabilities
    // If 'categoryData' exists or has changed from the response of 'useQuery', then run 'dispatch' to update the state with the 'UPDATE_CATEGORIES' action
    if (categoryData) {
      console.log(categoryData);
      // Execute our 'dispatch' function with our action object indicating the type of action and the data to set our state for categories
      dispatchAction({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });

      // Also store the category data in IndexedDB
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      console.log("I am offline");

      // If the user is offline, load data from IndexedDB
      idbPromise('categories', 'get').then((categories) => {
        dispatchAction({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatchAction]);

  const handleClick = (id) => {
    dispatchAction({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
