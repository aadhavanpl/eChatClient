import React, { useState } from 'react'
import styles from './chat.module.css'

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
	return (
		<div className={styles['container']}>
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
	)
}
