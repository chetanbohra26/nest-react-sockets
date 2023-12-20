import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(
      '🚀 ~ file: events.gateway.ts:11 ~ EventsGateway ~ handleMessage ~ payload:',
      payload,
    );
    console.log(
      '🚀 ~ file: events.gateway.ts:11 ~ EventsGateway ~ handleMessage ~ client:',
      client.id,
    );
    this.server.emit('message-response', { message: 'response from server' });
    return 'Hello world!';
  }
}
