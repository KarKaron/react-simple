import React, { Component } from 'react';
import './post-add-form.css';

export default class PostAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  // Ловим данные ввода пользователя
  onValueChange = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  // Ловим событие отправки формы
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState({
      text: ''
    });
  }

  render() {
    return ( 
      <form 
        className="bottom-panel d-flex"
        onSubmit={this.onSubmit}
      >
        <input 
          className="form-control new-post-label"
          type="text"
          placeholder="О чём Вы думаете сейчас?"
          onChange={this.onValueChange}
          value={this.state.text}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
        >
          Добавить
        </button>
      </form>
    );
  }
}