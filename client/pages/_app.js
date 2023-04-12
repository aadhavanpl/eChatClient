import '@/styles/globals.css'
import '../assets/fonts/Poppins/stylesheet.css'
import { SocketContext, socket } from '@/context/socket'

export default function App({ Component, pageProps }) {
	return (
		<SocketContext.Provider value={socket}>
			<Component {...pageProps} />
		</SocketContext.Provider>
	)
}
