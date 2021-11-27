import React from 'react'
import TodoList from './TodoList'
import Footer from './Footer'

function Content({ todoList, todoFilter, filterSet, todosSet }) {
    return (
        <>
            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <TodoList todos={todoList} todosSet={todosSet} />
            </section>
            <Footer todoFilter={todoFilter} filterSet={filterSet} todos={todoList} todosSet={todosSet} />
        </>
    )
}

export default Content
