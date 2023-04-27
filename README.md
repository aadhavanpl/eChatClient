# eChat

Encrypted chat room built using WebSockets.

## How to run

1. Clone the repository.

2. Create a `.env` file in `\client` and give a secret key: `NEXT_PUBLIC_KEY = '<YOUR_KEY>'`

3. Open two terminals, one in `\server` and one in `\client`

4. Run command `yarn dev` on both the terminals.

5. Open `http://localhost:3000` on a browser of your choice.

6. Multiple instances can be opened on the same machine to simulate multiple users and test concurrency.

## How to join with multiple devices

1. All the devices that want to communicate must be on the same network.

2. Navigate to `\client\context\socket.js` and change the IP to the the host's IP.

3. Navigate to `\server\index.js` and change the CORS origin IP to the host's IP.

4. Open two terminals on the host machine, one in `\server` and one in `\client`

5. Run command `yarn dev` on both the terminals.

6. Open `http://<YOUR_IP>:3000` on all the devices.

7. For all the devices to join the same room, enter the same Room code.

## Interface

![alt text](https://github.com/aadhavanpl/eChat/blob/master/client/public/login.png)

![alt text](https://github.com/aadhavanpl/eChat/blob/master/client/public/chat.png)

Designed using Figma
https://www.figma.com/file/dq6XOyPZAURNaK16wGFtNt/%2FeChat*?node-id=0%3A1&t=JZKNSxdO2c59Nfkk-1
