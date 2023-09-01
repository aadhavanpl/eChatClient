import styles from './login.module.css'

export default function Login({ socket, userName, setUserName, setLoggedIn, room, setRoom }) {
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
	)
}
