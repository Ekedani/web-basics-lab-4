export interface UsersChangedEvent {
  user: {
    username: string;
    id: string;
  }
  type: 'joined' | 'left';
  timestamp: Date;
}
