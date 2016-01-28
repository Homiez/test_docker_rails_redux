import Cable from 'es6-actioncable';

class _ActionCable {
  constructor() {
  }

  connect() {
    console.log('connecting websocket');
    this.consumer = Cable.createConsumer('ws://rails.docker:8000/cable');
  }

  getConsumer() {
    if (!this.consumer) {
      this.connect();
    }
    return this.consumer;
  }

  closeConnection() {
    if (this.consumer) {
      Cable.endConsumer(this.consumer);
    }
    delete this.consumer;
  }
}

const ActionCable = _ActionCable;

export default ActionCable;
