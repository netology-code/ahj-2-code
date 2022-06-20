// TODO: write code here

class SubsctiptionApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  
  async add(user) {
    const request = fetch(this.apiUrl + 'subscriptions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    
    const result = await request;
    
    if (!result.ok) {
      console.error('Ошибка');
      
      return;
    }

    const json = await result.json();
    const status = json.status;
    
    console.log(status);
  }
  
  async remove(user) {
    const query = 'subscriptions/' + encodeURIComponent(user.phone);

    const request = fetch(this.apiUrl + query, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    const result = await request;

    if (!result.ok) {
      console.error('Ошибка!');
      
      return;
    }

    const json = await result.json();
    const status = json.status;
    
    console.log(status);
  }
}

const eventSource = new EventSource('http://localhost:7070/sse');

eventSource.addEventListener('open', (e) => {
  console.log(e);
  
  console.log('sse open');
});

eventSource.addEventListener('error', (e) => {
  console.log(e);
  
  console.log('sse error');
});

const subscriptions = document.querySelector('.subscriptions');

eventSource.addEventListener('message', (e) => {
  console.log(e);
  const { name, phone } = JSON.parse(e.data);
  
  subscriptions.appendChild(document.createTextNode(`${name} ${phone}\n`));
  
  console.log('sse message');
});

const ws = new WebSocket('ws://http://localhost:7070/ws');

const chat = document.querySelector('.chat');
const chatMessage = document.querySelector('.chat-message');
const chatSend = document.querySelector('.chat-send');

chatSend.addEventListener('click', () => {
  const message = chatMessage.value;
  
  if (!message) return;
  
  ws.send(message);
  
  chatMessage.value = '';
});

ws.addEventListener('open', (e) => {
  console.log(e);
  
  console.log('ws open');
});

ws.addEventListener('close', (e) => {
  console.log(e);
  
  console.log('ws close');
});

ws.addEventListener('error', (e) => {
  console.log(e);
  
  console.log('ws error');
});

ws.addEventListener('message', (e) => {
  console.log(e);

  const data = JSON.parse(e.data);
  const { chat: messages } = data;
  
  messages.forEach(message => {
    chat.appendChild(document.createTextNode(message) + '\n');
  });
  
  console.log('ws message');
});

window.api = new SubscriptionApi('http://localhost:7070/');

