import React, { useRef } from 'react';

/**
 * Component responsible for loading the actions section.
 * It contains only the states which are internally required.
 * @param {*} props from the App component
 * @returns the actions section in the DOM.
 */
export default function Actions(props) {

  // STATE-CONSTANTS ==============================================================================================================================

  const inputCustomPrice = useRef(0);
  
  // STATE HANDLERS ===============================================================================================================================

  // Define a function for setting the current-price to the frozen-price
  function currentToFrozen() {
    props.setFrozenPrice(props.currentPrice);
  };

  // Change the fixed-profit percentage according to what is inputted by the user
  function customToFrozen() {
    inputCustomPrice.current = document.getElementById('inputCustomPrice')
    props.setFrozenPrice(inputCustomPrice.current.value)
  };

  // Clear the frozen-price by setting it to zero
  function clearFrozen() {
    inputCustomPrice.current = document.getElementById('inputCustomPrice')
    props.setFrozenPrice(0);
    inputCustomPrice.current.value = 0;
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RENDERING +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div>

      {/* Create a button to simulate a buy-action at current price */}
      <div className='text-center'><button className='buy-current text-center btn btn-outline-secondary btn-md' onClick={currentToFrozen}>Buy at current-price</button></div>
      <div className='or text-center'>OR:</div>

      {/* Create the input field for a simulated custom buy-price */}
      <div className='custom-buy'>
        <label for="inputCustomPrice">Custom buy-price:</label>
        <br/>
        <input name="inputCustomPrice" id="inputCustomPrice" type='number' placeholder='0' onChange={customToFrozen}></input>
      </div>

      {/* Create a button to clear the frozen states */}
      <div className='text-center'><button className='clear btn btn-outline-secondary btn-md' onClick={clearFrozen}>Clear</button></div> 

      {/* Create statements with the buy-price and its thresholds */}
      <div className='results text-center'>RESULTS:</div>
      <div className='buy-price'>The buy-price is <br/> {props.frozenPrice}</div>
      <div className='fixed-profit-price'>The fixed-profit price is <br/> {props.fixedProfitFrozenPrice}</div>
      <div className='stop-loss-price'>The stop-loss price is <br/> {props.stopLossFrozenPrice}</div>

    </div>
  );
}


