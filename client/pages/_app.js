import '@/styles/globals.css'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />
}
