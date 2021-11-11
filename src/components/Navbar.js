import React from 'react';
import logo_small from '../logo_small.png'

/**
 * Component responsible for loading the navbar on the page.
 * It contains only the states which are internally required.
 * @returns the navbar section in the DOM.
 */
export default function Navbar() {

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RENDERING +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div>

      {/* Create the navbar */}
      <nav class="navbar navbar-expand-lg">

        {/* Create a navbar brand */}
        <a class="navbar-brand" href="">
            <img class='app-logo' src={logo_small} alt='Coyote logo' width={45} height={45}></img>
            <span class='app-name'>COYOTE</span>
        </a>

      </nav>

    </div>
  );
}


