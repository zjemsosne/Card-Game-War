import React from 'react';
import ReactDOM from 'react-dom';

  export class UserList extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        pictures: []
      }
    }

    handleClick = (event) => {

      alert(event.target.getAttribute('data-test'))
    }

    componentWillMount() {
      fetch('https://randomuser.me/api/?results=1').then(results => {
        return results.json();
      }).then(data => {
        let pictures = data.results.map((pic) => {
          return(
            <div id='computerBox' key={pic.dob}>
              <p className={'opponentInfo'}>
                Grasz przeciwko:
              </p>
              <span className='computerName'>{pic.name.first[0].toUpperCase() + pic.name.first.slice(1) + " " + pic.name.last[0].toUpperCase() + pic.name.last.slice(1)}</span>
              <br></br>
              <img id='computerPlayerAvatar' src={pic.picture.large} data-test={pic.name.first + " " + pic.name.last} onClick={this.handleClick}/>
            </div>
          )

        })
        this.setState({pictures: pictures});
      })
    }

    render() {
      return (
        <div>
          {this.state.pictures}
        </div>
      )
    }
  }
