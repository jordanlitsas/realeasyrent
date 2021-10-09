const { eventNames } = require('process');
const io = require('socket.io');

//toast notifications
const Toast = {
  init(){
    this.hideTimeout = null;

    this.el = document.createElement('div');
    this.el.classname = 'toast';
    document.body.appendChild(this.el);
  },

  // show(message, state){
  //   clearTimeout(this.hideTimeout);

  //   this.el.textContent = message;
  //   this.el.className = 'toast toast--visible';

  //   if(state){
  //     this.el.classList.add(`toast--${state}`)
  //   }

  //   this.hideTimeout = setTimeout(() => {
  //       this.el.classList.remove('toast--visible')
  //   } ,3000);
  // }
};

const showMessage = (message) =>{
  // show(message, state){
    clearTimeout(this.hideTimeout);

    this.el.textContent = message;
    this.el.className = 'toast toast--visible';
    this.el.classList.add(`toast--success`)
    
    this.hideTimeout = setTimeout(() => {
        this.el.classList.remove('toast--visible')
    } ,3000);
  // }
}

// Notification integration with Jordan
const notificationSocket = io();

notificationSocket.on('toast toast--visible', message =>{

  showMessage(message);
  
});

document.addEventListener('DOMContentLoaded', ()=> Toast.init());


const socket = io();

//receiving message from Jordans end
io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });
    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;
        broadcast('message', data);
        messages.push(data);
      });
    });

// Message from server
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
  });
  


module.exports = {
    socket,
};






