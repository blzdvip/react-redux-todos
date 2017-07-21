/**
 * Created by yu on 2017/7/20.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'

export default class TodoList extends  React.Component {
    render () {
        return (
            <ul>
                {this.props.todos.map((todo, index) =>
                    <Todo onClick={() => this.props.onTodoClick(index)} {...todo}/>
                )}
            </ul>
        );
    }
}

TodoList.PropTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};