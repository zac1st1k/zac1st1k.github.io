import React from 'react';

const LOCATION = 'Randwick';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      measurement: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('https://api.openaq.org/v1/measurements?city=Sydney East&parameter=pm25')
      .then(response => response.json())
      .then(response => this.setState({
        measurement: response
          .results
          .find(i => i.location === LOCATION)
          .value,
        isLoading: false,
      }))
      .catch(error => console.log(error));
  }

  render() {
    const { isLoading, measurement } = this.state;
    return (
      <div>
        {
          isLoading
            ? <h2>Loading&hellip;</h2>
            : <h2>{LOCATION} Air Quality Index is {measurement}.</h2>
        }
      </div>
    );
  }
}
