const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
const server = http.createServer(app)

const userList = {}

const io = new Server(server, {
	cors: {
		origin: 'http://192.168.2.4:3000',
		methods: ['GET', 'POST'],
	},
})

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`)

	socket.on('joinRoom', (data) => {
		socket.join(data.room) //connect user to room
		console.log(
			`User with ID: ${socket.id} and Username: ${data.userName} joined room: ${data.room}`
		)
		if (userList[data.room] !== undefined)
			userList[data.room].push({
				userName: data.userName,
				avatar: `https://source.boringavatars.com/beam/120/${data.userName}?colors=D9DC50,D1BAC4,CB9A4C,B15357,902876`,
			})
		else
			userList[data.room] = [
				{
					userName: data.userName,
					avatar: `https://source.boringavatars.com/beam/120/${data.userName}?colors=D9DC50,D1BAC4,CB9A4C,B15357,902876`,
				},
			]
		io.in(data.room).emit('userList', userList[data.room])

		const notification = {
			userName: 'server',
			room: data.room,
			message: `${data.userName} has joined the room`,
		}
		io.in(data.room).emit('notifications', notification)
	})

	socket.on('sendMessage', (data) => {
		io.in(data.room).emit('recieveMessage', data)
	})

	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`)
	})

	socket.on('logout', (data) => {
		let index = 0
		for (let i = 0; i < userList[data.room].length; i++) {
			if (userList[data.room][i].userName === data.userName) {
				index = i
				break
			}
		}
		userList[data.room].splice(index, 1)
		io.in(data.room).emit('userList', userList[data.room])

		const notification = {
			userName: 'server',
			room: data.room,
			message: `${data.userName} has logged out of the room`,
		}
		io.in(data.room).emit('notifications', notification)
	})
})

server.listen(3001, () => {
	console.log('Server running')
})
