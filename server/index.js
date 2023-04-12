const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
})

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`)

	socket.on('joinRoom', (data) => {
		socket.join(data.room)
		console.log(
			`User with ID: ${socket.id} and Username: ${data.userName} joined room: ${data.room}`
		)
	})

	socket.on('sendMessage', (data) => {
		io.in(data.room).emit('recieveMessage', data)
	})

	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`)
	})
})

server.listen(3001, () => {
	console.log('Server running')
})
