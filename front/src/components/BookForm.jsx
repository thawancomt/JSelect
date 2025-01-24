import { useCallback } from 'react'
import { useState } from 'react'
export default function BookForm(props) {
    const [pages, setPages] = useState(0)
    const [name, setName] = useState('title')

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            props.callback(name, pages)
        }}>
        <label htmlFor="">{name}</label>
        <input type="text" placeholder="Digite o nome do livro"  style={{
            height: '30px',
            borderRadius: '5px',
        }} onInput={(e) => {
            setName(e.target.value)
        }}
        />
        <label htmlFor="">{pages}</label>
        <input type="text" name="pages" id="" placeholder="Numero de paginas" style={{
            height: '30px',
            borderRadius: '5px',
        }} onInput={(e) => {
            setPages(e.target.value)
        }}
        />
        <button type="submit">Criar</button>
        </form>
    )
}