import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function RootLayout({ children }) {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
  	)
}
