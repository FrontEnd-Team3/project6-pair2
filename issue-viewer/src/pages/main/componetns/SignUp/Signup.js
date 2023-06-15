import { useEffect, useState } from 'react'
import BasicButton from '../../../../components/Button/Button'
import useInputs from '../../../../hooks/use-inputs'
import * as S from '../style'

const SignUpForm = ({ setIsFormLogin }) => {
	const [{ email, password, passowrdConfirm }, onChangeForm] = useInputs({
		email: '',
		password: '',
		passowrdConfirm: '',
	})

	const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

	useEffect(() => {
		if (password !== passowrdConfirm) return setIsPasswordConfirm(false)
		setIsPasswordConfirm(true)
	}, [password, passowrdConfirm])

	// const { disalbed, errors } = useAuthValidation(password, email)

	const handleSignUpSumbit = e => {
		e.preventDefault()
		if (!email || !password) return
		if (!isPasswordConfirm) return
		alert('축하합니다. 회원가입이 완료되었습니다')
		setIsFormLogin(true)
	}

	/* 
    errors : {
        email : {message: 이메일 양식을 지켜주세요}
        passwrod: {message: 비밀번호 양식을 지켜수에 }
    }
    */

	/* 
        (기초)
        email은 email 양식을 지켜야하며 (@ 포함)
        password는 8글자 이상 작성 되어야한다.

        password - passwordConfirm이 달라졌을 때 실시간으로
        비밀번호와 비밀번호 확인이 다르지 않은지 확인하라는 에러 메세지
        
        BascicButton은
        데이터가 모두 채워져있지 않으면 dsiabled
        유효성이 검사되지 않으면 disabled --> 아이디와 비밀번호 양식을 확인해주세요 에러 메세지
        비밀번호와 비밀번호 확인이 다르면 disabled --> CSS 속성도 변경 (회색)

        login의 email 로직에도 똑같이 useInputs를 적용하고 유호성 적용 후
        커스텀 훅으로 함수 재사용 할 것 

        (1) state 최적화
        (2) custom hook 작성법 (모듈화)
        
        +

        (심화)
        react-hook-from 이용하여 랜더링 최적화
        단, 장단점을 정리하고 원하는 대로 효과를 거뒀는지 작성할 것
        구현을 목표로 하지 말고 실무에서 자주 사용하는 라이브러리 이므로 확실하게 이해하는 것이 중요
    */

	return (
		<S.Form>
			<S.InputBox>
				<label>이메일</label>
				<input onChange={onChangeForm} name="email" />
			</S.InputBox>
			<S.InputBox>
				<label>비밀번호</label>
				<input onChange={onChangeForm} name="password" />
			</S.InputBox>
			<S.InputBox>
				<label>비밀번호 확인</label>
				<input onChange={onChangeForm} name="passowrdConfirm" />
			</S.InputBox>
			<BasicButton
				size={'full'}
				shape={'default'}
				variant={'primary'}
				onClick={handleSignUpSumbit}
			>
				회원가입
			</BasicButton>
		</S.Form>
	)
}
export default SignUpForm
