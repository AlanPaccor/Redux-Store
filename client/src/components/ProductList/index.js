import React, { useEffect } from 'react';

// // Commented out in favor of Redux logic
// import { useStoreContext } from '../../utilities/GlobalState';

import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from '../../utilities/actions';
import { useQuery } from '@apollo/react-hooks';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utilities/queries';
import spinner from '../../assets/spinner.gif';

// Import IndexDB helper for database communication
import { idbPromise } from '../../utilities/helpers';

// currentCategory prop is no longer used as it's part of the
// function ProductList({ currentCategory }) {
// global state

function ProductList() {

  // Commented out in favor of Redux logic
  // const [state, dispatch] = useStoreContext();
  const stateSelector = useSelector((state) => {
    return state;
  });
  const dispatchAction = useDispatch();

  const { currentCategory } = stateSelector;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // const products = data?.products || [];

  useEffect(() => {
    // When there is data to be stored
    if (data) {
      // Store it in the global state object
      dispatchAction({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      // Save each product to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // If loading is undefined, the user is offline - get data from the `products` store in IndexedDB
      idbPromise('products', 'get').then((products) => {
        console.log("I am offline");
        // Use retrieved data to set global state for offline browsing
        dispatchAction({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatchAction]);

  function filterProducts() {
    if (!currentCategory) {
      return stateSelector.products;
    }

    return stateSelector.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {stateSelector.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
