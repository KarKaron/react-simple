import React, { Component } from 'react';
import './search-panel.css';

export default class SeacrhPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  // Ловим данные от пользователя в строке поиске
  onUpdateSearch = (e) => {
    const term = e.target.value
    this.setState({term});
    this.props.onUpdateSeacrh(term);
  }

  render() {
    return ( 
      <input 
        className="form-control search-input"
        type="text"
        placeholder="Поиск по записям"
        onChange={this.onUpdateSearch}
        value={this.state.term}
      />
     );
  }
}
