import { useNavigate } from 'react-router-dom'

import * as S from '../style'
import BasicButton from 'components/Button/Button'

const SignInForm = () => {
	const navigation = useNavigate()

	const onPressSignIn = e => {
		e.preventDefault()
		console.log(e.target.email.value, e.target.password.value)
		const email = e.target.email.value
		const password = e.target.password.value
		if (email === 'test' && password === 'testtest') {
			return navigation('/todo/1', {
				state: {
					email,
					password,
				},
			})
		}
		return alert('아이디와 비밀번호를 확인해주세요')
	}

	return (
		<S.Form onSubmit={onPressSignIn}>
			<S.InputBox>
				<label>이메일</label>
				<input name="email" />
			</S.InputBox>
			<S.InputBox>
				<label>비밀번호</label>
				<input name="password" />
			</S.InputBox>
			<BasicButton size={'full'} shape={'default'} variant={'primary'}>
				로그인
			</BasicButton>
		</S.Form>
	)
}
export default SignInForm
