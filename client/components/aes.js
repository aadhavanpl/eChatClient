const CryptoJS = require('crypto-js')

export const encryptData = (data) => {
	const encrypted = CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_KEY).toString()
	console.log(encrypted)
	return encrypted
}

export const decryptData = (data) => {
	const decrypted = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_KEY).toString(
		CryptoJS.enc.Utf8
	)
	console.log(decrypted)
	return decrypted
}
