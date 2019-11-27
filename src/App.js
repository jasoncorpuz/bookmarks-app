import React, { Component } from 'react';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import BookmarksContext from './BookmarksContext'
import EditBookmark from './EditBookmark/EditBookmark'
import { Route, Link , withRouter} from 'react-router-dom'

const bookmarks = [
  {
    id: 0,
    title: 'Google',
    url: 'http://www.google.com',
    rating: '3',
    desc: 'Internet-related services and products.'
  },
  {
    id: 1,
    title: 'Thinkful',
    url: 'http://www.thinkful.com',
    rating: '5',
    desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  },
  {
    id: 2,
    title: 'Github',
    url: 'http://www.github.com',
    rating: '4',
    desc: 'brings together the world\'s largest community of developers.'
  }
];

class App extends Component {
  state = {
    page: 'list',
    bookmarks,
    error: null,
  };

  changePage = (page) => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
      page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    })
  }

  updateBookmark = updatedBookmark => { 
    this.setState({
      bookmarks: this.state.bookmarks.map(bm =>
        (bm.id !== updatedBookmark.id) ? bm : updatedBookmark
      )
    })
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      updateBookmark: this.updateBookmark,
    }
    const { bookmarks } = this.state
    return (
      <BookmarksContext.Provider value={contextValue}>
        <main className='App'>
          <h1>Bookmarks!</h1>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route path='/' render={(props) => <BookmarkList bookmarks={bookmarks} {...props} />} exact />
            <Route path='/add-bookmarks' render={(props) => <AddBookmark onAddBookmark={this.addBookmark}  {...props} />} exactß />
            <Route path='/edit/:id' render={(props) => <EditBookmark {...props}/>} exact />
          </div>
        </main>
      </BookmarksContext.Provider>
    );
  }
}

export default withRouter(App);
