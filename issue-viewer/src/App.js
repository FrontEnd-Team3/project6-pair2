import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routing'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyles from './styles/global'
import { Provider } from 'react-redux'
import { store } from 'store/store'

function App() {
	
	console.log(process.env.NODE_ENV)
	// npm start -> 개발환경? 배포환경? -> 개발환경 -> "development"
	// npm run build -> serve -s build -> 배포환경 테스트 -> "production"
	// 배포환경과 개발환경 구분

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	)
}
export default App
