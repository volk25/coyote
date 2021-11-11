import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Settings from './components/Settings';
import Chart from './components/Chart';
import Actions from './components/Actions';
import Footer from './components/Footer';

/**
 * Main component of the application.
 * It contains all the states shared between components.
 * @returns the application execution in the DOM.
 */
export default function App() {

  // STATE-CONSTANTS===========================================================================================================================

  // Define the state constants related to the symbol selection
  const [availableSymbols, setAvailableSymbols] = useState(['loading available symbols...']);
  const [symbol, setSymbol] = useState('BTCUSDT');

  // Define the state constants related to the interval selection
  const intervalToMilliseconds = {
    '1m': 60000,
    '3m': 180000,
    '5m': 300000,
    '15m': 900000,
    '30m': 1800000,
    '1h': 3600000,
    '2h': 7200000,
    '4h': 14400000,
    '6h': 21600000,
    '8h': 28800000,
    '12h': 43200000,
    '1d': 86400000,
    '3d': 259200000,
    '1w': 604800000,
    '1M': 2419200000
  };
  const [interval, setInterval] = useState('1m');
  const [intervalCount, setIntervalCount] = useState(0);

  // Define the state constants related to historical dateTime and OHLC
  const [histDateTime, setHistDateTime] = useState([]);
  const [openPrice, setOpenPrice] = useState([]);
  const [highPrice, setHighPrice] = useState([]);
  const [lowPrice, setLowPrice] = useState([]);
  const [closePrice, setClosePrice] = useState([]);

  // Define the state constant for the web socket and listened values
  const ws = useRef('');
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  // Define the state constant for the frozen price
  const [frozenPrice, setFrozenPrice] = useState(0);

  // Define the state constants for maker-fee
  const [makerFee, setMakerFee] = useState(0.075);

  // Define the state constants for fixed-profit
  const [fixedProfit, setFixedProfit] = useState(0.01);
  const [fixedProfitCurrentPrice, setFixedProfitCurrentPrice] = useState(0);
  const [fixedProfitFrozenPrice, setFixedProfitFrozenPrice] = useState(0);

  // Define the state constants for stop-loss
  const [stopLoss, setStopLoss] = useState(0.3);
  const [stopLossCurrentPrice, setStopLossCurrentPrice] = useState(0);
  const [stopLossFrozenPrice, setStopLossFrozenPrice] = useState(0);

  // Define URLs
  const baseWsUrl = 'wss://stream.binance.com:9443/ws';
  const baseHttpUrl = 'https://api.binance.com';

  // FUNCTIONS BASED ON WEBSOCKET  =============================================================================================================

  // Define a function to initialize the WebSocket of a symbol
  function initWebSocket() {
    let wsUrl = baseWsUrl + '/' + symbol.toLowerCase() + '@trade'
    ws.current = new WebSocket(wsUrl);
    console.log('A new Websocket for ' + symbol + ' has been created')
  };

  // Define a function for listening timestamp and price
  function listenTimestampAndPrice() {
    console.log('Starting to listen timestamp and price of ' + symbol)
    let timestampInSeconds = 0;
    ws.current.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (Math.floor(data.E / 1000) !== timestampInSeconds) {
        setCurrentTimestamp(data.E);
        setCurrentPrice(data.p);
        timestampInSeconds = Math.floor(data.E / 1000); 
      }
    };
  };

  // UPDATERS ==================================================================================================================================

  // Define a function to update all the available symbols
  function updateAvailableSymbols() {
    const symbolUrl = baseHttpUrl + '/api/v1/exchangeInfo';
    axios
      .get(symbolUrl)
      .then((response) => {
        let symbolArray = [];
        for (let i = 0; i < response.data.symbols.length; i++) {
          symbolArray.push(response.data.symbols[i]['symbol']);
        };
        setAvailableSymbols(symbolArray);
        console.log('List of available symbols loaded successfully')
      })
      .catch((error) => console.error(error));
  };

  // Define a function to update the dateTime and OHLC state
  function updateOhlc() {
    const ohlcUrl = baseHttpUrl + '/api/v3/klines?symbol=' + symbol + '&interval=' + interval;
    axios
      .get(ohlcUrl)
      .then((response) => {
        let histDateTimeArray = [];
        let openPriceArray = [];
        let highPriceArray = [];
        let lowPriceArray = [];
        let closePriceArray = [];
        for (let i = 0; i < response.data.length; i++) {
          let dt = new Date(response.data[i][0])
          histDateTimeArray.push(dt);
          openPriceArray.push(Number(response.data[i][1]));
          highPriceArray.push(Number(response.data[i][2]));
          lowPriceArray.push(Number(response.data[i][3]));
          closePriceArray.push(Number(response.data[i][4]));
        };
        setHistDateTime(histDateTimeArray);
        setOpenPrice(openPriceArray);
        setHighPrice(highPriceArray);
        setLowPrice(lowPriceArray);
        setClosePrice(closePriceArray);
        console.log('OHLC data for ' + symbol + ' with interval ' + interval + ' has been updated')
      })
      .catch((error) => console.error(error));
  };

  // Define a function to trigger the update of dateTime and OHLC state
  function updateIntervalCount() {
    let currentIntervalCount = Math.floor(currentTimestamp / intervalToMilliseconds[interval]);
    if (intervalCount !== currentIntervalCount) {
      setIntervalCount(currentIntervalCount);
    };
  };

  // Define a function to update the fixed-profit price
  function updateFixedProfitPrice(priceType) {
    if (priceType === 'current') {
      let thresholdCurrent = ((1 + (fixedProfit / 100)) * currentPrice) / (1 - (makerFee / 100)) ** 2;
      setFixedProfitCurrentPrice(thresholdCurrent); 
    } else if (priceType === 'frozen') {
      let thresholdFrozen = ((1 + (fixedProfit / 100)) * frozenPrice) / (1 - (makerFee / 100)) ** 2;
      setFixedProfitFrozenPrice(thresholdFrozen);
      console.log('Fixed-profit frozen price has been updated')
    }
  };

  // Define a function to update the stop-loss price
  function updateStopLossPrice(priceType) {
    if (priceType === 'current') {
      let thresholdCurrent = ((1 - (stopLoss / 100)) * currentPrice) / (1 - (makerFee / 100)) ** 2;
      setStopLossCurrentPrice(thresholdCurrent)
    } else if (priceType === 'frozen') {
      let thresholdFrozen = ((1 - (stopLoss / 100)) * frozenPrice) / (1 - (makerFee / 100)) ** 2;
      setStopLossFrozenPrice(thresholdFrozen);
      console.log('Stop-loss frozen price has been updated')
    }
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ EXECUTION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Do the following only once after the loading of the component
  useEffect(() => {
    updateAvailableSymbols(); 
  }, []);

  // Do the following when the symbol or interval are changed
  useEffect(() => {
    if (ws.current === '') {
      updateOhlc();
      initWebSocket();
      listenTimestampAndPrice();
    } else if (ws.current !== '') {
      ws.current.close()
      ws.current.onclose = function() {
        console.log('Previous Websocket has been closed')
        updateOhlc();
        initWebSocket();
        listenTimestampAndPrice();
      }
    };
  }, [symbol, interval]);

  // Do the following when the current-timestamp is changed
  useEffect(() => {
    updateIntervalCount();
  }, [currentTimestamp])

  useEffect(() => {
    updateOhlc();
  }, [intervalCount])

  // Do the following when the maker-fee, fixed-profit or current-price are changed
  useEffect(() => {
    updateFixedProfitPrice('current');
  }, [makerFee, fixedProfit, currentPrice]);

  // Do the following when the maker-fee, stop-loss or current-price are changed
  useEffect(() => {
    updateStopLossPrice('current');
  }, [makerFee, stopLoss, currentPrice]);

  // Do the following when the frozen-price is changed
  useEffect(() => {
    updateFixedProfitPrice('frozen');
    updateStopLossPrice('frozen');
  }, [frozenPrice]);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RENDERING +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div>

      {/* Insert the Navbar */}
      <Navbar/>

      {/* Create an informational line (TEMPORARY)
      <div>The current price of {symbol} at timestamp {currentTimestamp} is {currentPrice}</div>
      <button onClick={updateOhlc}>Manually update OHLC</button> */}

      {/* Create a Bootstrap grid element */}
      <div class="row">

        {/* Insert the Settings */}
        <div class="settings about-left col-lg-2 col-md-2 col-sm-12 col-12">
          <Settings
          availableSymbols = {availableSymbols}
          setSymbol = {setSymbol}
          interval = {interval}
          setInterval = {setInterval}
          setMakerFee = {setMakerFee}
          setFixedProfit = {setFixedProfit}
          setStopLoss = {setStopLoss}
          />
        </div>
      
        {/* Insert the Chart */}
        <div class="about-left col-lg-8 col-md-8 col-sm-12 col-12">
          <div id='chart'>
            <Chart

            // Pass to the chart the historical datetime and the OHLC prices
            histDateTime = {histDateTime}
            openPrice = {openPrice}
            highPrice = {highPrice}
            lowPrice = {lowPrice}
            closePrice = {closePrice}

            // Pass to the chart the current-price and its thresholds
            currentPrice = {currentPrice}
            fixedProfitCurrentPrice = {fixedProfitCurrentPrice}
            stopLossCurrentPrice = {stopLossCurrentPrice}        

            // Pass to the chart the frozen-price and its thresholds
            frozenPrice = {frozenPrice}
            fixedProfitFrozenPrice = {fixedProfitFrozenPrice}
            stopLossFrozenPrice = {stopLossFrozenPrice}
            />
          </div>
        </div>

        {/* Insert the Actions */}
        <div class="actions about-left col-lg-2 col-md-2 col-sm-12 col-12">
          <Actions
          currentPrice = {currentPrice}
          setFrozenPrice = {setFrozenPrice}
          frozenPrice = {frozenPrice}
          fixedProfitFrozenPrice = {fixedProfitFrozenPrice}
          stopLossFrozenPrice = {stopLossFrozenPrice}
          />
        </div>

      </div>

      {/* Insert the Footer */}
      <Footer/>

    </div>
  );
}


