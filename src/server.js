import Server from 'socket.io';

export default function startServer() {
  const io = new Server().attach(process.env.PROT || 9000);
}
