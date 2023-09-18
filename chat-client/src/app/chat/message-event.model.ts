export interface MessageEvent {
  user: {
    username: string;
    id: string;
  }
  content: string;
  timestamp: Date;
}
