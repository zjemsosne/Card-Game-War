import React from 'react';
import ReactDOM from 'react-dom';

  export class CardRandom extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        cards: [],
        cardsPlayer: [],
        cardsComputer: [],
        cardsValues: []
      }
    }

    handleCardClick = (event) => {

      // check how many cards are left in player's and computer's stocks
      let remainingCards = this.state.cardsComputer.length
      let remainingCardsPlayer = this.state.cardsPlayer.length

      //
      if (remainingCards === 0) {

        ReactDOM.render(
            <div>
              <div className={'center'}>
                <h1>Gracz wygrywa! Brawo!</h1>
                <div id='' className={'card'}></div>
                <span>VS</span>
                <div id='' className={'card'}></div>
              </div>
            </div>,
            document.getElementById('board'),
        );

      }

      if (remainingCardsPlayer === 0) {

        ReactDOM.render(
            <div>
              <div className={'center'}>
                <h1>Komputer wygrywa! :(</h1>
                <div id='' className={'card'}></div>
                <span>VS</span>
                <div id='' className={'card'}></div>
              </div>
            </div>,
            document.getElementById('board'),
        );

      }

      let compCard = 0
      let compCard2 = 1
      let compCard3 = 2

      let playerCard2 = 0
      let playerCard3 = 1

      // generate random cards
      let randomCardNumber = Math.floor((Math.random() * remainingCards) + 0)
      let randomCardNumber2 = Math.floor((Math.random() * remainingCards) + 0)
      let randomCardNumber3 = Math.floor((Math.random() * remainingCards) + 0)

      let randomCardPlayer = Math.floor((Math.random() * remainingCardsPlayer) + 0);
      let randomCardPlayer2 = Math.floor((Math.random() * remainingCardsPlayer) + 0);

      // array for keeping cards on the board
      let vsList = []

      // array for keeping a result which card is higher
      let vsValues = []

      // determine which card from player's stock was clicked
      let clickedCardIndex = this.state.cardsPlayer.findIndex(x => x.props.id==event.target.dataset.code)

      // render clicked cards (palyer's side) and a random card from the computer's stock
      ReactDOM.render(
          <div>{this.state.cardsPlayer[clickedCardIndex]}</div>,
          document.getElementById('playerCard'),
      );

      ReactDOM.render(
          <div>{this.state.cardsComputer[compCard]}</div>,
          document.getElementById('compCard'),
      );

      // push player's and computer's card to an array before checking which one is higher
      vsList.push(this.state.cardsComputer[compCard])
      vsList.push(this.state.cardsPlayer[clickedCardIndex])

      // push values of player's and computer's card
      vsValues.push(vsList[0].props.children.props['data-value'])
      vsValues.push(vsList[1].props.children.props['data-value'])

      // determine who won (result > 0 => computer; result < 0 => player; result => War/Draw)
      let result = vsList[0].props.children.props['data-value']-vsList[1].props.children.props['data-value'];

      // push result to an array
      vsValues.push(result)

      // remove selected cards from stocks
      let array = this.state.cardsPlayer;
      let arrayComp = this.state.cardsComputer;

      array.splice(clickedCardIndex, 1);
      arrayComp.splice(compCard, 1);

      // check result and push cards to a winner's stock (if draw => war and another switch case)
      switch (true) {
        case result > 0:
          arrayComp.push(vsList[0]);
          arrayComp.push(vsList[1]);
          break;
        case result < 0:
          array.push(vsList[0]);
          array.push(vsList[1]);
          break;
        case result === 0:

          // adds 'showBack' class to hide the middle card during War
          document.getElementById('compCard').classList.add('showBack')
          document.getElementById('playerCard').classList.add('showBack')

          // push 2nd and 3rd card from computer's stock to a vsList array
          vsList.push(this.state.cardsComputer[compCard])
          arrayComp.splice(this.state.cardsComputer[0], 1);

          vsList.push(this.state.cardsComputer[compCard])
          arrayComp.splice(this.state.cardsComputer[0], 1);
          // remove these cards from computer's stock

          // render 3 cards (middle hidden) on computer's side
          ReactDOM.render(
              <div>
                <div>{vsList[0]}</div>
                <div>{vsList[2]}</div>
                <div>{vsList[3]}</div>
              </div>,
              document.getElementById('compCard'),
          );

          // push 1st and 2nd card from player's stock to a vsList array
          vsList.push(this.state.cardsPlayer[playerCard2])
          vsList.push(this.state.cardsPlayer[playerCard3])

          // remove these cards from players's stock
          array.splice(this.state.cardsPlayer[playerCard2], 1);
          array.splice(this.state.cardsPlayer[playerCard3], 1);

          // render 3 cards (middle hidden) on player's side
          ReactDOM.render(
              <div>
                <div>{vsList[1]}</div>
                <div>{vsList[4]}</div>
                <div>{vsList[5]}</div>
              </div>,
              document.getElementById('playerCard'),
          );

          // check who won the war (if another draw, player wins)
          let resultWar = vsList[3].props.children.props['data-value']-vsList[5].props.children.props['data-value'];

          switch (true) {
            case resultWar > 0:
              arrayComp.push(vsList[0]);
              arrayComp.push(vsList[1]);
              arrayComp.push(vsList[2]);
              arrayComp.push(vsList[3]);
              arrayComp.push(vsList[4]);
              arrayComp.push(vsList[5]);
              break;
            case result < 0:
              array.push(vsList[0]);
              array.push(vsList[1]);
              array.push(vsList[2]);
              array.push(vsList[3]);
              array.push(vsList[4]);
              array.push(vsList[5]);
              break;
            case result === 0:
              array.push(vsList[0]);
              array.push(vsList[1]);
              array.push(vsList[2]);
              array.push(vsList[3]);
              array.push(vsList[4]);
              array.push(vsList[5]);
              break;
          }
          break;
      }

      // get all cards from vsList
      let winningCardsList = [];
      for (var i = 0; i < vsList.length; i++) {
        winningCardsList.push(vsList[i].props.children.props['data-code'].substring(2))
      }
      console.log(`Cards on the board: ${winningCardsList}`)

      ReactDOM.render(
          <div>{winningCardsList.join(', ')}</div>,
          document.getElementById('cardsOnBoard'),
      );

      // update the state of stocks
      this.setState({
        cardsPlayer: array,
        cardsComputer: arrayComp
      })

    }

    handlCardValue = (cardValue) => {

      switch (cardValue) {
        case 'JACK':
          return 11;
        case 'QUEEN':
          return 12;
        case 'KING':
          return 13;
        case 'ACE':
          return 14;
        default:
          return Number(cardValue);
      }

    }

    componentWillMount() {
      fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52').then(cards => {
        return cards.json();
      }).then(data => {

        var justCardValues = [];
        var cardValuesList = data.cards.map(function(card) {

          switch (card.value) {
            case 'JACK':
              return justCardValues.push(11);
            case 'QUEEN':
              return justCardValues.push(12);
            case 'KING':
              return justCardValues.push(13);
            case 'ACE':
              return justCardValues.push(14);
            default:
              return justCardValues.push(Number(card.value));
          }

        });

        let cards = data.cards.map((card, index) => {
          return (
            <div className={'cardImageDiv'} id={'id' + card.code} key={card.code} >
              <img className={'cardMain'} src={card.image} data-code={'id' + card.code} data-index={index} data-value={this.handlCardValue(card.value)} onClick={this.handleCardClick}/>
            </div>
          )
        })

        let cardsPlayerList = [];
        let cardsComputerList = [];
        let computerBack

        for (var i = 0; i < cards.length; i++) {
          if (i < 26) {
            cardsPlayerList.push(cards[i])
          } else {
            cardsComputerList.push(cards[i])
          }
        }

        this.setState({
          cards: cards,
          cardsPlayer: cardsPlayerList,
          cardsComputer: cardsComputerList,
          cardsValues: justCardValues
        });

      })

    }

    componentDidMount() {

    }

    render() {
      return (
        <div className={'cardListHalfs'}>
          {this.state.cardsPlayer}
          <br></br>
          <br></br>
          {this.state.cardsComputer}
        </div>

      )
    };

  }
