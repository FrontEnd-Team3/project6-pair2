import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BasicButton from '../../components/Button/Button'
import styled from 'styled-components'
import { flexAlignCenter, flexCenter } from '../../styles/common'
import TodoAddModal from './componetns/Modal/add-modal'
import TodoList from './componetns/List/todo-list'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'

const TodoPage = () => {
	const params = useParams()
	console.log(params)

	const [isAddTodoModal, setIsAddTodoModal] = useState(false)
	const [todoList, setTodoList] = useState([
		{
			id: 1,
			title: 'example1',
			content: 'content1',
			state: false,
		},
		{
			id: 2,
			title: 'example2',
			content: 'content2',
			state: false,
		},
		{
			id: 3,
			title: 'example3',
			content: 'content3',
			state: false,
		},
	])

	const myState = useSelector(state => state.todo);
	const dispatch = useDispatch();

	const addTodo = (title, content) => {
		return new Promise(resolve =>
			setTimeout(() => {
				const newTodo = {
					id: Math.floor(Math.random() * 100000),
					state: false,
					title,
					content,
				}
				resolve(newTodo)
			}, 3000),
		).then(todo => {
			console.log(todo)
			dispatch({type: "ADD_TODO", payload: todo})
		})
	}

	const showTodoToastMessage = e => {
		e.preventDefault()
		const title = e.target.title.value
		const content = e.target.content.value
		toast.promise(addTodo(title, content), {
			pending: 'TODO LOADING',
			success: 'TODO SUCEESS',
			error: 'TODO ERROR',
		})
	}

	const toastOption = {
		autoClose: 2000,
		theme: 'colored',
	}

	const handAddTodoModal = () => {
		setIsAddTodoModal(true)
	}

	const handleCloseTodoModal = () => {
		setIsAddTodoModal(false)
	}

	return (
		<>
			{isAddTodoModal && (
				<TodoAddModal
					onAddToDo={showTodoToastMessage}
					onClose={handleCloseTodoModal}
				/>
			)}
			<S.Wrapper>
				<S.Container>
					<S.Title>List</S.Title>
					<S.Content>
						<TodoList />
					</S.Content>
					<S.ButtonBox>
						<BasicButton
							variant={'primary'}
							size={'full'}
							onClick={handAddTodoModal}
						>
							추가
						</BasicButton>
					</S.ButtonBox>
				</S.Container>
			</S.Wrapper>
			<ToastContainer {...toastOption} />
		</>
	)
}
export default TodoPage

const Wrapper = styled.div`
	height: calc(100vh - 60px);
	padding-bottom: 60px;
	${flexCenter};
`

const Container = styled.div`
	width: 420px;
	height: 100%;
	background-color: ${({ theme }) => theme.PALETTE.white};
	border-radius: 8px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
	position: relative;
`

const Title = styled.h1`
	background-color: ${({ theme }) => theme.PALETTE.primary[300]};
	color: ${({ theme }) => theme.PALETTE.fontColor};
	padding-left: 32px;
	height: 32px;
	${flexAlignCenter};
`

const Content = styled.div`
	width: 100%;
	height: calc(100% - 32px);
	padding-bottom: 64px;
	overflow: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`

const ButtonBox = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0;
`

const S = {
	Wrapper,
	Container,
	Title,
	ButtonBox,
	Content,
}
