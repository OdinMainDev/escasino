import Pusher, { Channel } from 'pusher-js';

class PusherService {
  private pusher: Pusher;
  private channels: { [key: string]: Channel } = {};

  constructor(api_key: string, cluster: string) {
    this.pusher = new Pusher(api_key, {
      cluster: cluster,
    });
  }

  subscribe(channelName: string, eventName: string, callback: (data: object) => void) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = this.pusher.subscribe(channelName);
    }

    this.channels[channelName].bind(eventName, callback);
  }

  unsubscribe(channelName: string, eventName: string) {
    if (this.channels[channelName]) {
      this.channels[channelName].unbind(eventName);
      this.pusher.unsubscribe(channelName);
      delete this.channels[channelName];
    }
  }
}

export default PusherService;
