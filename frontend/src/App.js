import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {
	const [socketInstance, setSocketInstance] = useState();

	useEffect(() => {
		const socket = io('http://localhost:3000');
		socket.on('connect', () => {
			console.log('Connected');
			socket.emit('message', { message: 'Ping from client' });
		});

		socket.on('disconnect', () => {
			console.log('Disconnected');
		});

		socket.on('message-response', (payload) => {
			console.log('🚀 ~ file: App.js:18 ~ socket.on ~ payload:', payload);
		});

		setSocketInstance(socket);
	}, []);

	useEffect(() => {
		return () => socketInstance?.disconnect();
	}, [socketInstance]);

	return <p>Hello</p>;
};

export default App;
