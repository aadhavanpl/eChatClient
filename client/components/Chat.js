import React, { useEffect, useState } from 'react'
import styles from './chat.module.css'
import { useRouter } from 'next/router'

export default function Chat({ socket, userName, room }) {
	const [currentMessage, setCurrentMessage] = useState('')
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			sendMessage()
		}
	}

	const sendMessage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				userName: userName,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
			}
			await socket.emit('sendMessage', messageData)
		}
	}

	useEffect(() => {
		socket.on('recieveMessage', (data) => {
			console.log(data)
		})
	}, [socket])

	const data = [
		{
			icon: '/user.svg',
			name: 'Lorem ipsum',
		},
		{
			icon: '/user.svg',
			name: 'Lorem ipsum',
		},
		{
			icon: '/user.svg',
			name: 'Lorem ipsum',
		},
		{
			icon: '/user.svg',
			name: 'Lorem ipsum',
		},
		{
			icon: '/user.svg',
			name: 'Lorem ipsum',
		},
		{
			icon: '/user.svg',
			name: 'Lorem ipsum',
		},
	]

	const router = useRouter()

	function handleLogout() {
		router.push('/')
	}

	return (
		<div className={styles['container']}>
			<div className={styles['participants-container']}>
				<div className={styles['participants-wrapper']}>
					<h3>Participants ({data.length}):</h3>
					<div className={styles['participants-content']}>
						{data.length > 0 ? (
							data.map((item, index) => (
								<div key={index} className={styles['participants-user-wrapper']}>
									<img src={item.icon} />
									<span>{item.name}</span>
								</div>
							))
						) : (
							<></>
						)}
					</div>
				</div>
				<img src='/logout.svg' className={styles['participants-logout']} onClick={handleLogout} />
			</div>
			<div className={styles['wrapper']}>
				<div className={styles['room-wrapper']}>
					Room: {room}
					<img src='/share.svg' />
				</div>
				{/* <div className={styles['chat']}> */}
				<div className={styles['chat-container']}>
					<div className={styles['chat-wrapper']}>
						{/* {messages.map((item, index) => (
					<div key={index}>
						{console.log(item)}
						{item.text.startsWith('Welcome') || item.text.includes('has joined the chat') ? (
							<div className={styles['middle']}>{item.text}</div>
						) : item.username !== usernamee ? (
							<div className={styles['left']}>
								<img src={item.avatar} />
								{item.text}
								{console.log(item.text.startsWith('Welcome'))}
								{console.log(item.text.includes('has joined the chat'))}
							</div>
						) : (
							<div className={styles['right']}>
								<img src={item.avatar} />
								{item.text}
							</div>
						)}
					</div>
				))} */}
						{/* <div ref={messagesEndRef} /> */}
					</div>
					<div className={styles['send-wrapper']}>
						<input
							placeholder='Type message here'
							value={currentMessage}
							onChange={(e) => setCurrentMessage(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<img src='/send.svg' onClick={sendMessage} />
					</div>
				</div>
				{/* </div>	 */}
			</div>
		</div>
	)
}
