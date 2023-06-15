import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

// function MainPage(){
// }

const MainPage = () => {
	const [searchParams, setSearchParms] = useSearchParams()
	console.log(searchParams.get('todoId'))
	const navigte = useNavigate()

	const onClickNavigateTodo = () => {
		// window.location.href = '/todo/3'
		// navigate(-1)
		// navigte('/todo/3')
		setSearchParms({
			todoId: 3,
			page: 5,
		})
	}

	return (
		// <></>
		<React.Fragment>
			{/** 태그명이 없는 태그를 Fragment라고 부른다. 만약 해당 Frament에 속성을 줄 경우 */}
			<div>main</div>
			<div>:)</div>
			<button onClick={onClickNavigateTodo}>TodoPage로 이동</button>
			<a href="/todo/3">TODOPAGE</a>
			<Link to="/todo/5">TODOPAGE</Link>
		</React.Fragment>
	)
}
export default MainPage
