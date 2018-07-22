import Constanst from './config';

function getWebsocket() {
  if (!websocket) {
    websocket = new WebSocket(Constanst.socketHost);
  }
  return websocket;
}

export async function watchList(cb) {
  const client = getWebsocket();

  client.onopen = () => {
    //client.send(JSON.stringify({type: 'login'}));
  };

  client.onmessage = evt => {};
}

export async function send(data) {
  const websocket = getWebsocket();
  //websocket.send(JSON.stringify(data));
}

export async function close(code, reason) {
  const websocket = getWebsocket();
  websocket.close(code, reason);
}
