import { Outlet } from 'react-router-dom'
import Footer from './Footer/footer'
import Header from './Header'

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}
export default Layout
