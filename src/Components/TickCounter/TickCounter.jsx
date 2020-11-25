import React from 'react';
import './TickCounter.css';

export default ({ tick }) =>
  <div className='tick-counter-wrapper'>
    <div className='tick-counter'>
      {tick}
    </div>
  </div>;
