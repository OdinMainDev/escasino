import Pusher, { Channel } from 'pusher-js';

class PusherService {
  private static instance: PusherService;
  private pusher: Pusher;
  private channels: { [key: string]: Channel } = {};
  private currentChannelName: string | null = null;
  private connectedCallbacks: (() => void)[] = [];

  private constructor(api_key: string, cluster: string) {
    this.pusher = new Pusher(api_key, {
      cluster: cluster,
    });


    this.pusher.connection.bind('error', (err: { error: { data?: { code: number } } }) => {
      console.error('Pusher connection error:', err);
      if (err.error.data && err.error.data.code === 4004) {
        console.warn('Pusher access restricted (possibly due to quota). Reconnecting...');
        setTimeout(() => {
          this.reconnect();
        }, 5000);
      }
    });

    this.pusher.connection.bind('disconnected', () => {
      console.warn('Pusher disconnected. Reconnecting...');
      this.reconnect();
    });

    this.pusher.connection.bind('connected', () => {
      this.connectedCallbacks.forEach((callback) => callback());
    });

  }

  public onConnected(callback: () => void) {
    if (this.isConnected()) {
      callback();
    } else {
      this.connectedCallbacks.push(callback);
    }
  }

  public static getInstance(api_key: string, cluster: string): PusherService {
    if (!PusherService.instance) {
      PusherService.instance = new PusherService(api_key, cluster);
    }
    return PusherService.instance;
  }

  private reconnect() {
    if (this.currentChannelName) {
      const channel = this.channels[this.currentChannelName];
      if (channel) {
        channel.unbind_all();
        this.pusher.unsubscribe(this.currentChannelName);
        delete this.channels[this.currentChannelName];
      }
      this.channels[this.currentChannelName] = this.pusher.subscribe(this.currentChannelName);
    }
  }

  public subscribe(channelName: string, eventName: string, callback: (data: object) => void) {
    if (this.currentChannelName && this.currentChannelName !== channelName) {
      this.unsubscribe(this.currentChannelName);
    }

    if (!this.channels[channelName]) {
      this.channels[channelName] = this.pusher.subscribe(channelName);
    }

    this.currentChannelName = channelName;
    this.channels[channelName].bind(eventName, callback);
  }

  public unsubscribe(channelName: string) {
    if (this.channels[channelName]) {
      this.channels[channelName].unbind_all();
      this.pusher.unsubscribe(channelName);
      delete this.channels[channelName];
      this.currentChannelName = null;
    }
  }

  public disconnect() {
    Object.keys(this.channels).forEach((channelName) => {
      this.unsubscribe(channelName);
    });

    this.pusher.disconnect();
    console.log('Pusher connection has been disconnected.');
  }

  public isConnected() {
    if (!this.pusher) {
      return false;
    }
    return this.pusher.connection.state === 'connected';
  }
}

export default PusherService;
