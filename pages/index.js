import Head from 'next/head'
import Login from '@/components/Login'
import { useState } from 'react'

import styles from '../styles/index.module.css'
import Chat from '@/components/Chat'

import { socket } from '../context/socket'

export default function Home() {
	const [userName, setUserName] = useState('')
	const [room, setRoom] = useState('')
	const [loggedIn, setLoggedIn] = useState(false)

	return (
		<>
			<div className={styles['container']}>
				<Head>
					<title>/eChat*</title>
					<meta name='/eChat*' content='An encrypted chat app to create rooms.' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				{!loggedIn ? (
					<Login
						socket={socket}
						userName={userName}
						setUserName={setUserName}
						room={room}
						setRoom={setRoom}
						setLoggedIn={setLoggedIn}
					/>
				) : (
					<Chat socket={socket} userName={userName} room={room} setLoggedIn={setLoggedIn} />
				)}
			</div>
			<span className={styles['logo']}>#eTwoE</span>
		</>
	)
}
