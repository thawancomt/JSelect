import { useState } from 'react'
import './App.css'
import List  from './components/List'
import BookForm from './components/BookForm'
import UpdateBookForm from './components/UpdateBookForm'

function App() {
  const [count, setCount] = useState(0)
  const [books, setBooks] = useState([])
  const [formVisibility, setFormVisibility] = useState(false)
  const [updateFormVisibility, setUpdateFormVisibility] = useState(false)

  const [updateName, setUpdateName] = useState('')
  const [updatePages, setUpdatePages] = useState('')
  const [updateId, setUpdateId] = useState('')
  
  function fetchBooks() {
    fetch('http://localhost:8000/api/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data)
      })
  }

  function createBook(name, pages) {
    fetch('http://localhost:8000/api/book/create', {
      method : 'POST',
      headers : {
        "content-type" : "application/json" 
      },
      body : JSON.stringify({
        pages : pages,
        name : name
      }),
    }), 
    fetchBooks()
  }

  async function updateBook(id, name, pages) {
    await fetch('http://localhost:8000/api/book/'+id, {
      method : 'PUT',
      headers : {
        "content-type" : "application/json" 
      },
      body : JSON.stringify({
        pages : pages,
        name : name
      }),
    }), 
    fetchBooks()
  }
  async function deleteBook(id) {
    await fetch('http://localhost:8000/api/book/delete/'+id, {
      method : 'DELETE',
      headers : {
        "content-type" : "application/json" 
      },
    }), 
    fetchBooks()
  }

  return (
    <>
      {books.length > 0 && <List books={books} deleteCallback={(id) => {
        deleteBook(id)
      }} callback={{p : updateFormVisibility, pp : setUpdateFormVisibility}} updateCallback={ (id, name, pages) => {
        setUpdateFormVisibility(!updateFormVisibility)
        setUpdateName(name);
        setUpdatePages(pages);
        setUpdateId(id);
      }} />}
      <div style={
          {
            display: 'flex',
          }
        }>
        <button onClick={fetchBooks}>Buscar Livros</button>
        <button onClick={() => {
          setFormVisibility(!formVisibility),
          fetchBooks()
        }} >Criar Livro</button>
      </div>
      {formVisibility && <BookForm callback={createBook} />}
      {updateFormVisibility && <UpdateBookForm callback={updateBook} id={updateId} pages={updatePages} name={updateName}/>}
    </>
  )
}

export default App
