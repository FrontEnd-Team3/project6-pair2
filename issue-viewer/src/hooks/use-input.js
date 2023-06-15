/*
  커스텀 훅이란?
  훅을 사용하고 있는 재사용 가능한 로직을 모듈화
  
  
  재사용 가능성이 없을 훅을 커스텀 훅으로 만드는 것은 옳을까요? 옳지 않을까요?
 */

import { useState } from 'react'

const useInput = (initialValue = '') => {
	const [value, setValue] = useState(initialValue)
	const onChnage = e => {
		setValue(e.target.value)
	}
	return [value, onChnage, setValue]
}
export default useInput
