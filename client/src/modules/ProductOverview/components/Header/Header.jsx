import React from 'react';
import Button from './HeaderStyles.js';

class Header extends React.Component {
    constructor() {
      super();
    }

  render() {
    return (
      <div>
        Header Component
        <Button>Button</Button>
      </div>
    )
  }
}

export default Header;