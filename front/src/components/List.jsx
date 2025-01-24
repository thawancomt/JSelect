export default function List(props) {
    return (
        <div>
        <h1>Lista de Livros</h1>
        <ul>
            {props.books.map( book => {
                return <li key={book.id}>The {book.name} has {book.pages} pages............   
                <button onClick={(e) => {
                    e.stopPropagation()
                    console.log(e.target);
                    props.deleteCallback(book.id)
                }}>Delear</button>
                <button onClick={(e) => {
                    e.stopPropagation()
                    props.updateCallback(book.id, book.name, book.pages)
                }}>Editar</button>
                </li>
            }) }
        </ul>
        </div>
    )
}