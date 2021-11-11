import React from 'react';
import Plot from 'react-plotly.js';

/**
 * Component responsible for loading the charts section.
 * @param {*} props from the App component
 * @returns the charts section in the DOM
 */
export default function Chart(props) {
    
    // TRACES =====================================================================================================================================

    // CANDLESTICKS

    let candlesticks = {
        x: props.histDateTime,
        open: props.openPrice, // this should be called always 'open'
        high: props.highPrice, // this should be called always 'high'
        low: props.lowPrice, // this should be called always 'low'
        close: props.closePrice, // this should be called always 'close'
        y: 'y', // this should be just 'y'
        type: 'candlestick',
        line: {
            color: 'rgba(31,119,180,1)',
            width: 1
        },
        increasing: {
            line: {
                color: 'green'
            }
        },
        decreasing: {
            line: {
                color: 'red'
            }
        }
    };

    // CURRENT-PRICE AND ITS THRESHOLDS TRACES

    let currentPrice = {
        x: props.histDateTime,
        y: Array(props.histDateTime.length).fill(props.currentPrice),
        line: {
            color: 'white',
            width: 1,
            dash: 'dashdot'
        }
    };

    let fixedProfitCurrentPrice = {
        x: props.histDateTime,
        y: Array(props.histDateTime.length).fill(props.fixedProfitCurrentPrice),
        line: {
            color: 'green',
            width: 1,
            dash: 'dashdot'
        }
    };

    let stopLossCurrentPrice = {
        x: props.histDateTime,
        y: Array(props.histDateTime.length).fill(props.stopLossCurrentPrice),
        line: {
            color: 'red',
            width: 1,
            dash: 'dashdot'
        }
    };

    // FROZEN-PRICE AND ITS THRESHOLDS TRACES

    let frozenPrice = {
        x: props.histDateTime,
        y: Array(props.histDateTime.length).fill(props.frozenPrice),
        line: {
            color: 'white',
            width: 1,
            dash: 'solid'
        }
    };

    let fixedProfitFrozenPrice = {
        x: props.histDateTime,
        y: Array(props.histDateTime.length).fill(props.fixedProfitFrozenPrice),
        line: {
            color: 'green',
            width: 1,
            dash: 'solid'
        }
    };

    let stopLossFrozenPrice = {
        x: props.histDateTime,
        y: Array(props.histDateTime.length).fill(props.stopLossFrozenPrice),
        line: {
            color: 'red',
            width: 1,
            dash: 'solid'
        }
    };

    // SETUP THE TRACES

    function setupTraces() {
        if ((props.frozenPrice !== 0) && (props.fixedProfitFrozenPrice !== 0) && (props.stopLossFrozenPrice !== 0)) {
            return [candlesticks, currentPrice, frozenPrice, fixedProfitFrozenPrice, stopLossFrozenPrice];
        } else if ((props.currentPrice !== 0) && (props.fixedProfitCurrentPrice !== 0) && (props.stopLossCurrentPrice !== 0)) {
            return [candlesticks, currentPrice, fixedProfitCurrentPrice, stopLossCurrentPrice];
        } else {
            return [candlesticks]
        }
    };

    // LAYOUT ELEMENTS ============================================================================================================================

    // CURRENT-PRICE AND ITS THRESHOLDS ANNOTATIONS

    let currentPriceAnn = {
        xref: "paper", 
        x: 1.005,
        y: props.currentPrice, 
        text: props.currentPrice, 
        arrowhead: 20,
        ax: 45,
        ay: 0,
        bgcolor: 'white',
        arrowcolor: 'white',
        font: {
            size: 9,
            color: 'black'
        },
        bordercolor: 'black',
        borderwidth: 1,
        borderpad: 1.5
    };

    let fixedProfitCurrentPriceAnn = {
        xref: "paper", 
        x: 1.005,
        y: props.fixedProfitCurrentPrice, 
        text: props.fixedProfitCurrentPrice, 
        arrowhead: 20,
        ax: 45,
        ay: 0,
        bgcolor: 'green',
        arrowcolor: 'green',
        font: {
            size: 9,
            color: 'white'
        },
        bordercolor: 'green',
        borderwidth: 1,
        borderpad: 1.5
    };

    let stopLossCurrentPriceAnn = {
        xref: "paper", 
        x: 1.005,
        y: props.stopLossCurrentPrice, 
        text: props.stopLossCurrentPrice, 
        arrowhead: 20,
        ax: 45,
        ay: 0,
        bgcolor: 'red',
        arrowcolor: 'red',
        font: {
            size: 9,
            color: 'white'
        },
        bordercolor: 'red',
        borderwidth: 1,
        borderpad: 1.5
    };

    // FROZEN-PRICE AND ITS THRESHOLDS ANNOTATIONS

    let frozenPriceAnn = {
        xref: "paper", 
        x: 1.005,
        y: props.frozenPrice, 
        text: props.frozenPrice, 
        arrowhead: 20,
        ax: 45,
        ay: 0,
        bgcolor: 'white',
        arrowcolor: 'white',
        font: {
            size: 9,
            color: 'black'
        },
        bordercolor: 'black',
        borderwidth: 1,
        borderpad: 1.5
    };

    let fixedProfitFrozenPriceAnn = {
        xref: "paper", 
        x: 1.005,
        y: props.fixedProfitFrozenPrice, 
        text: props.fixedProfitFrozenPrice, 
        arrowhead: 20,
        ax: 45,
        ay: 0,
        bgcolor: 'green',
        arrowcolor: 'green',
        font: {
            size: 9,
            color: 'white'
        },
        bordercolor: 'green',
        borderwidth: 1,
        borderpad: 1.5
    };

    let stopLossFrozenPriceAnn = {
        xref: "paper", 
        x: 1.005,
        y: props.stopLossFrozenPrice, 
        text: props.stopLossFrozenPrice, 
        arrowhead: 20,
        ax: 45,
        ay: 0,
        bgcolor: 'red',
        arrowcolor: 'red',
        font: {
            size: 9,
            color: 'white'
        },
        bordercolor: 'red',
        borderwidth: 1,
        borderpad: 1.5
    };

    // SETUP THE ANNOTATIONS

    function setupAnnotations() {
        if ((props.frozenPrice !== 0) && (props.fixedProfitFrozenPrice !== 0) && (props.stopLossFrozenPrice !== 0)) {
            return [currentPriceAnn, frozenPriceAnn, fixedProfitFrozenPriceAnn, stopLossFrozenPriceAnn];
        } else if ((props.currentPrice !== 0) && (props.fixedProfitCurrentPrice !== 0) && (props.stopLossCurrentPrice !== 0)) {
            return [currentPriceAnn, fixedProfitCurrentPriceAnn, stopLossCurrentPriceAnn];
        } else {
            return []
        }
    }

    // SETUP THE WHOLE LAYOUT

    let layout = {
        margin: {
            l: 100,
            r: 100,
            b: 10,
            t: 20,
            pad: 30
        },
        paper_bgcolor: '#1a1a1a',
        plot_bgcolor: '#1a1a1a',
        showlegend: false,
        xaxis: {
            autorange: true, 
            domain: [0, 1],  
            title: 'Date', 
            type: 'date'
        }, 
        yaxis: {
            autorange: true, 
            domain: [0, 1],
            title: 'Price',
            type: 'linear'
        },
        annotations: setupAnnotations()
    };

    // STYLE ELEMENTS ================================================================================================================================

    let style = {
        width: '100%',
        height: window.innerHeight - 140
    }

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RENDERING +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    return (
        <div>
            <Plot
            data = {setupTraces()}
            layout = {layout}
            useResizeHandler={true}
            style={style}
            />
        </div>
    );
}
