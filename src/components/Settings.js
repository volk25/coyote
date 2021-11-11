import React, { useRef } from 'react';

/**
 * Component responsible for loading the settings section.
 * It contains only the states which are internally required.
 * @param {*} props from the App component
 * @returns the settings section in the DOM
 */
export default function Settings(props) {

  // STATE-CONSTANTS ==============================================================================================================================

  const selectSymbol = useRef('');
  const selectInterval = useRef('');
  const availableIntervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
  const inputMakerFee = useRef(0.075);
  const inputFixedProfit = useRef(0.01);
  const inputStopLoss = useRef(0.3);

  // STATE HANDLERS ===============================================================================================================================

  // Change the symbol according to what is inputted by the user
  function handleSymbol() {
    selectSymbol.current = document.getElementById('selectSymbol');
    props.setSymbol(selectSymbol.current.value);
    console.log('Symbol has been changed to ' + selectSymbol.current.value);
  };

  // Change the interval according to what is inputted by the user
  function handleInterval() {
    selectInterval.current = document.getElementById('selectInterval');
    props.setInterval(selectInterval.current.value);
    console.log('Interval has been changed to ' + selectInterval.current.value);
  };

  // Change the maker-fee percentage according to what is inputted by the user
  function handleMakerFee() {
    inputMakerFee.current = document.getElementById('inputMakerFee');
    props.setMakerFee(inputMakerFee.current.value);
    console.log('Maker-fee has been changed to ' + inputMakerFee.current.value);
  };

  // Change the fixed-profit percentage according to what is inputted by the user
  function handleFixedProfit() {
    inputFixedProfit.current = document.getElementById('inputFixedProfit');
    props.setFixedProfit(inputFixedProfit.current.value);
    console.log('Fixed-profit has been changed to ' + inputFixedProfit.current.value);
  };

  // Change the stop-loss percentage according to what is inputted by the user
  function handleStopLoss() {
    inputStopLoss.current = document.getElementById('inputStopLoss');
    props.setStopLoss(inputStopLoss.current.value);
    console.log('Stop-loss has been changed to ' + inputStopLoss.current.value);
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RENDERING +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div>

      {/* Create the symbol selection dropdown */}
      <div className='symbol'>
        <label for="selectSymbol">Choose a symbol:</label>
        <br/>
        <select id="selectSymbol" onChange={handleSymbol}>
          <option value='BTCUSDT'>BTCUSDT</option>
          {
            props.availableSymbols.map((symbolInArray) => (
                <option value={symbolInArray}>{symbolInArray}</option>
            ))
          }
        </select>
      </div>

      {/* Create the interval selection dropdown */}
      <div className='interval'>
        <label for="selectInterval">Choose an interval:</label>
        <br/>
        <select id="selectInterval" onChange={handleInterval}>
          {
            availableIntervals.map((intervalInArray) => (
                <option value={intervalInArray}>{intervalInArray}</option>
            ))
          }
        </select>
      </div>

      {/* Create a horizontal rule */}
      <hr/>
      
      {/* Create the maker-fee percentage input */}
      <div className='maker-fee'>
        <label for="inputMakerFee">Type the maker-fee (%):</label>
        <br/>
        <input name="inputMakerFee" id="inputMakerFee" type='number' placeholder='0.075' onChange={handleMakerFee}></input>
      </div>

      {/* Create the fixed-profit percentage input */}
      <div className='fixed-profit'>
        <label for="inputFixedProfit">Type the fixed-profit (%):</label>
        <br/>
        <input name="inputFixedProfit" id="inputFixedProfit" type='number' placeholder='0.01' onChange={handleFixedProfit}></input>
      </div>

      {/* Create the stop-loss percentage input */}
      <div className='stop-loss'>
        <label for="inputStopLoss">Type the stop-loss (%):</label>
        <br/>
        <input name="inputStopLoss" id="inputStopLoss" type='number' placeholder='0.3' onChange={handleStopLoss}></input>
      </div>

    </div>
  );
}


