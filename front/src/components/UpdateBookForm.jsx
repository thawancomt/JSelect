import { useState } from 'react'
export default function UpdateBookForm(props) {
    const [id, setId] = useState(props.id)
    const [pages, setPages] = useState(props.pages)
    const [name, setName] = useState(props.name)

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            props.callback(props.id, name, pages)       
        }}>
        <h1>id : {id} </h1>
        <label htmlFor="">{name}</label>
        <input type="text" placeholder="Digite o nome do livro" value={name} style={{
            height: '30px',
            borderRadius: '5px',
        }} onInput={(e) => {
            setName(e.target.value)
        }}
        />
        <label htmlFor="">{pages}</label>
        <input type="text" name="pages" value={pages} id="" placeholder="Numero de paginas" style={{
            height: '30px',
            borderRadius: '5px',
        }} onInput={(e) => {
            setPages(e.target.value)
        }}
        />
        <button type="button" onClick={ () => {
            props.callback(id, name, pages)
        }}>Atualizar</button>
        </form>
    )
}