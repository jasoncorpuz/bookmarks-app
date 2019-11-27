import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <button>
        <Link to ='/'>Bookmark List</Link>
      </button>
      {' '}
      <button>
        <Link to ='/add-bookmarks'>AddBookmarks</Link>
      </button>
    
  
    </nav>
  );
}
