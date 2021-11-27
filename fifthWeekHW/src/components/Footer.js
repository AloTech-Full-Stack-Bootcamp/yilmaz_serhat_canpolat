import React from 'react'

function Footer({ todoFilter, filterSet, todosSet, todos }) {

    const clearCompleted = () => {
        const cleared = todos.filter(item => {
            return item.completed === false
        })
        todosSet(cleared);
    }


    const leftCount = todos.filter(item => {
        return item.completed === false
    })


    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{leftCount.length}</strong>
                items left
            </span>

            <ul className="filters">
                <li>
                    <a href="#" className={todoFilter === "all" ? "selected" : ""} onClick={() => filterSet("all")} >All</a>
                </li>
                <li>
                    <a href="#" className={todoFilter === "active" ? "selected" : ""} onClick={() => filterSet("active")} >Active</a>
                </li>
                <li>
                    <a href="#" className={todoFilter === "completed" ? "selected" : ""} onClick={() => filterSet("completed")} >Completed</a>
                </li>
            </ul>

            <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
            </button>
        </footer>
    )
}

export default Footer
