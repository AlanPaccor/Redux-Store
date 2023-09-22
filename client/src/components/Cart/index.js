import React, { useEffect } from 'react';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utilities/actions';
import { idbPromise } from '../../utilities/helpers';
import CartItem from '../CartItem';
import Auth from '../../utilities/auth';
import './style.css';
// Commented out in favor of Redux logic
// import { useStoreContext } from '../../utilities/GlobalState';
import { useDispatch, useSelector } from 'react-redux';
// Stripe checkout API
// To be used as part of the button checkout process
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utilities/queries';

// API key in the context of REACT as a testing key.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  /*
  You'll use the custom useStoreContext Hook to establish
  a state variable and the dispatch() function to update
  the state. In this case, dispatch() will call the TOGGLE_CART
  action. In the Cart functional component, write the following code:
  */

  // Commented out in favor of Redux logic
  // const [state, dispatch] = useStoreContext();

  const stateSelector = useSelector((state) => {
    return state;
  });

  const dispatchAction = useDispatch();

  // Using lazyQuery to be used as part of the checkout function
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    // Async function to get data from IndexedDB
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatchAction({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    // Check global state for any cart products, and if not, use the function to retrieve data from the IndexedDB store
    if (!stateSelector.cart.length) {
      getCart();
    }
  }, [stateSelector.cart.length, dispatchAction]);

  // Use effect for checkout lazy hook
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // useEffect(() => {
  //   async function getCart() {
  //     const cart = await idbPromise('cart', 'get');
  //     dispatchAction({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
  //   }

  //   if (!stateSelector.cart.length) {
  //     getCart();
  //   }
  // }, [stateSelector.cart.length, dispatchAction]);

  function toggleCart() {
    dispatchAction({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    stateSelector.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // Call our QUERY_CHECKOUT query
  // Handle Stripe checkout
  function submitCheckout() {
    const productIds = [];

    stateSelector.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!stateSelector.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {stateSelector.cart.length ? (
        <div>
          {stateSelector.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
