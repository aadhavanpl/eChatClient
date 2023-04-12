import React, { useContext, useState } from 'react'
import styles from './login.module.css'
import { SocketContext } from 'context/socket'
import Chat from './Chat'

export default function Login() {
	const socket = useContext(SocketContext)

	const [userName, setUserName] = useState('')
	const [room, setRoom] = useState('')
	const [loggedIn, setLoggedIn] = useState(false)

	const joinRoom = () => {
		if (userName !== '' && room !== '') {
			socket.emit('joinRoom', { userName, room })
			setLoggedIn(true)
		}
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && userName != null && room != null) {
			joinRoom()
		}
	}

	return (
		<>
			{loggedIn ? (
				<Chat socket={socket} userName={userName} room={room} />
			) : (
				<div className={styles['container']}>
					<div className={styles['wrapper']}>
						<h1 className={styles['heading']}>/eChat*</h1>
						<div className={styles['input-wrapper']}>
							<span>Username:</span>
							<input
								placeholder='Enter a username'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>
						<div className={styles['input-wrapper']} style={{ marginTop: 20 }}>
							<span>Room code:</span>
							<input
								placeholder='Enter a roomcode'
								value={room}
								onChange={(e) => setRoom(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</div>
						<img src='/join-room.svg' className={styles['join-room-button']} onClick={joinRoom} />
					</div>
				</div>
			)}
		</>
	)
}
