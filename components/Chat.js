import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { encryptData, decryptData } from './aes'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from './chat.module.css'

export default function Chat({ socket, userName, room, setLoggedIn }) {
	const [currentMessage, setCurrentMessage] = useState('')
	const [messageList, setMessageList] = useState([])
	const [userList, setUserList] = useState([])

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			sendMessage()
		}
	}

	const sendMessage = async () => {
		if (currentMessage !== '') {
			//encrypt message
			const encryptedMessage = encryptData(currentMessage)

			const messageData = {
				room: room,
				userName: userName,
				message: encryptedMessage,
				avatar: `https://source.boringavatars.com/beam/120/${userName}?colors=D9DC50,D1BAC4,CB9A4C,B15357,902876`,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
			}
			await socket.emit('sendMessage', messageData)
			setCurrentMessage('')
		}
	}

	useEffect(() => {
		socket.on('recieveMessage', (data) => {
			data.encrypted = data.message
			const decryptedMessage = decryptData(data.message)
			data.message = decryptedMessage
			setMessageList((list) => [...list, data])
		})
		socket.on('userList', (data) => {
			setUserList(data)
			console.log(data)
		})
		socket.on('notifications', (data) => {
			setMessageList((list) => [...list, data])
		})
		console.log(messageList)
	}, [socket])

	function handleLogout() {
		const logoutData = {
			room: room,
			userName: userName,
		}
		socket.emit('logout', logoutData)
		setLoggedIn(false)
	}

	return (
		<div className={styles['container']}>
			<div className={styles['participants-container']}>
				<div className={styles['participants-wrapper']}>
					<h3>Participants ({userList.length}):</h3>
					<div className={styles['participants-content']}>
						{userList.length > 0 ? (
							userList.map((item, index) => (
								<div key={index} className={styles['participants-user-wrapper']}>
									<img src={item.avatar} />
									<span>{item.userName}</span>
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
					<CopyToClipboard
						text={`Join ${userName}'s eChat🔐 Room\nRoom code: ${room}`}
						// onCopy={() => setValue(`Join ${userName}'s eChat Room | Room code: ${room}`)}
					>
						<img src='/share.svg' />
					</CopyToClipboard>
				</div>
				{/* <div className={styles['chat']}> */}
				<div className={styles['chat-container']}>
					<div className={styles['chat-wrapper']}>
						<ScrollToBottom className={styles['scroller']}>
							{messageList.map((item, index) => (
								<div key={index} className={styles['spacing']}>
									{item.userName === userName ? (
										<div className={styles['right-container']}>
											<div className={styles['right-wrapper']}>
												<div className={styles['right']}>
													<div className={styles['message-box']} style={{ alignItems: 'flex-end' }}>
														{item.message}
														<div>{item.encrypted}</div>
													</div>
													<img src={item.avatar} />
												</div>
												<span>
													{item.userName}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{item.time}
												</span>
											</div>
										</div>
									) : item.userName === 'server' ? (
										<div className={styles['middle']}>{item.message}</div>
									) : (
										<div className={styles['left-wrapper']}>
											<div className={styles['left']}>
												<img src={item.avatar} />
												<div className={styles['message-box']}>
													{item.message}
													<div>{item.encrypted}</div>
												</div>
											</div>
											<span>
												{item.userName}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{item.time}
											</span>
										</div>
									)}
								</div>
							))}
						</ScrollToBottom>
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
