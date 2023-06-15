import { createBrowserRouter } from 'react-router-dom'
import MainPage from 'pages/main'
import Layout from 'components/Layout'
import DetailPage from '../pages/detail'

// export const router = createBrowserRouter([])
const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/:postId',
				element: <DetailPage />,
			},
		],
	},
])

/* 기본값 */
export default router
