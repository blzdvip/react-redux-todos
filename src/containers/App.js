/**
 * Created by yu on 2017/7/20.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions'
import AddTodo from "../components/addTodo";
import TodoList from "../components/todoList";
import Footer from "../components/footer";
class  App extends React.Component {
    render() {
        // Injected by connect() call:
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        return (
          <div>
            <AddTodo onAddClick={(text) =>
                dispatch(addTodo(text))
            } />

            <TodoList todos={visibleTodos} onTodoClick={(index) =>
                dispatch(completeTodo(index))
            }/>
            <Footer filter={visibilityFilter} onFilterChange={(nextFilter) =>
                dispatch(setVisibilityFilter(nextFilter))
            }/>
          </div>
        );
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            complete: PropTypes.bool.isRequired
        }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
        default:
            return todos;
    }
}

function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    };
}

export default connect(select)(App);