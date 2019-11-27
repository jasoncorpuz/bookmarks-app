import React, { Component } from 'react';
import BookmarksContext from '../BookmarksContext'
import config from '../config'
class EditBookmark extends Component {
    state = {
        title: '',
        url: '',
        rating: '',
        description: '',
        id: ''
    }

    titleChange(newTitle) {
        this.setState({ title: newTitle })
    }

    urlChange(newUrl) {
        this.setState({ url: newUrl })
    }

    ratingChange(newRating) {
        this.setState({ rating: newRating })
    }

    descriptionChange(newDescrip) {
        this.setState({ description: newDescrip })
    }

    handleSubmit = e =>  {
        e.preventDefault();
        const { id, title, url, description, rating} = this.state
        const newBkmk = {id, title, url, description, rating}
        const BookMarkId = this.props.match.params.id
        fetch(config.API_ENDPOINT + `${BookMarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(newBkmk),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
          })
        .then(() => {
            this.props.history.push('/')
            this.context.updateBookmark(newBkmk)
        })
    }

    static contextType = BookmarksContext
    componentDidMount() {
        const id = this.props.match.params.id
        fetch(config.API_ENDPOINT + `${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(error => Promise.reject(error))
                return res.json()
            })

            .then(res => {
                this.setState({
                    id: res.id,
                    title: res.title,
                    url: res.url,
                    description: res.description,
                    rating: res.rating
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        console.log(this.context)
        const { title, rating, url, description } = this.state
        return (
            <section className='EditBookmarkForm'>
                <h2>Edit Bookmark</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={title}
                        onChange={e => this.titleChange(e.target.value)}
                    >
                    </input>
                    <label htmlFor='URL'>URL</label>
                    <input
                        type='text'
                        name='URL'
                        value={url}
                        onChange={e => this.urlChange(e.target.value)}
                    >
                    </input>
                    <label htmlFor='Rating'>Rating</label>
                    <input
                        type='number'
                        name='Rating'
                        value={rating}
                        onChange={e => this.ratingChange(e.target.value)}
                    >
                    </input>
                    <label htmlFor='Description'>Description</label>
                    <input
                        type='text'
                        name='Description'
                        value={description}
                        onChange={e => this.descriptionChange(e.target.value)}
                    >
                    </input>
                    <button type='submit'>SAVE</button>
                </form>
            </section>
        )
    }
}

export default EditBookmark;