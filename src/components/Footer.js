import React from 'react';

/**
 * Component responsible for loading the footer on the page.
 * It contains only the states which are internally required.
 * @returns the footer section in the DOM.
 */
export default function Footer() {

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RENDERING +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div>

        {/* Create the footer */}
        <footer>
            <div class="tools text-center">
                App realized using React.js, Bootstrap 4, Binance API
            </div> 
            <div class="copyright text-center">
                © Copyright Nikita Volkov 2021
            </div> 
        </footer>

    </div>
  );
}


