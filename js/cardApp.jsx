import React from 'react';
import ReactDOM from 'react-dom';
import { UserList } from './userApp.jsx';
import { CardRandom } from './cardsRandomizer.jsx';

document.addEventListener('DOMContentLoaded', function(){

  class Apps extends React.Component {
    constructor(props) {
      super(props)
      this.state = {

      }
    }

    handleClick = () => {
      ReactDOM.render(
        <CardRandom />,
        document.getElementById('cardList')
      );
    }

    render() {
      return (
        <div>
          <button id='startButton' onClick={this.handleClick}>start</button>
        </div>
      )
    }
  }

  ReactDOM.render(
    <Apps />,
    document.getElementById('buttonPlace'),
  );

  ReactDOM.render(
    <UserList />,
    document.getElementById('app'),
  );

});
