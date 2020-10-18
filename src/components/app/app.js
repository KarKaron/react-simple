import React, {Component} from 'react';
import AppHeader from './app-header/app-header';
import SeacrhPanel from '../search/search-panel/seacrh-panel';
import PostStatusFilter from '../post/post-status-filter/post-status-filter';
import PostList from '../post/post-list/post-list';
import PostAddForm from '../post/post-add-form/post-add-form';
import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 1, label: "Ullamco est elit consequat ad reprehenderit deserunt qui proident.", important: true, like: true},
        {id: 2, label: "Enim culpa amet laboris ea ipsum voluptate ut ad mollit veniam nulla.", important: false, like: false},
        {id: 3, label: "Mollit ipsum ex ipsum est ullamco.", important: false, like: false},
        {id: 4, label: "Ad duis do labore sint ipsum tempor reprehenderit fugiat aute aliqua sit cillum amet.", important: false, like: false}
      ],
      term: '',
      filter: 'all'
    };
    this.maxId = 5;
  }

  // Функция добавления записи
  addItem = text => {
    const newItem = {
      id: this.maxId++,
      label: text,
      important: false
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      
      return {
        data: newArr
      }
    });
  }

  // Функция удаления записи
  deleteItem = id => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      
      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, ...after];

      return {
        data: newArr
      }
    });
  }

  // Функция смены состояния по клику на звёздочку
  onToggleImportant = id => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const oldElem = data[index];
      const newElem = {...oldElem, important: !oldElem.important}

      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, newElem, ...after];

      return {
        data: newArr
      }
    });
  }

  // Функция смены состояния на клике по элементу (добавление и удаление сердечка)
  onToggleLiked = id => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const oldElem = data[index];
      const newElem = {...oldElem, like: !oldElem.like}

      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, newElem, ...after];

      return {
        data: newArr
      }
    });
  }

  // Функция фильтрации записей по строке поиска
  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    } 
    return items.filter((item) => {
      return item.label.indexOf(term) > -1
    });
  }

  // Функция смены состояния State при получении данных поиска
  onUpdateSearch = term => {
    this.setState({term});
  }

  // Функция фильтрации записей по типу записи (наличие и отсутствие сердечка)
  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like);
    } else {
      return items;
    }
  }

  // Функция смены состояния State при получении данных поиска
  onFilterSelect = filter => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    
    const liked = data.filter(item => item.like).length;
    const total = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <AppBlock>
        <AppHeader
          liked={liked}
          total={total}
        />
        <div className="search-panel d-flex">
          <SeacrhPanel
            onUpdateSeacrh={this.onUpdateSearch}
          />
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList 
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm
          onAdd={this.addItem}
        />
      </AppBlock>    
    );
  }  
}