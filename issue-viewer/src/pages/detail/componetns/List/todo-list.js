import { useDispatch, useSelector } from 'react-redux'
import OneTodo from './one-todo'

const TodoList = () => {
	const todoList = useSelector((state) => state.todo);
	const dispatch = useDispatch();

	return (
		<>
			{todoList.map(todo => (
				<OneTodo todo={todo} />
			))}
		</>
	)
}
export default TodoList
