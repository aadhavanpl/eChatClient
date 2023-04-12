import '@/styles/globals.css'
// import io from 'socket.io-client'
import '../assets/fonts/Poppins/stylesheet.css'
import { SocketContext, socket } from '@/context/socket'

// export const socket = io.connect('http://localhost:3001')

export default function App({ Component, pageProps }) {
	return (
		<SocketContext.Provider value={socket}>
			<Component {...pageProps} />
		</SocketContext.Provider>
	)
}
