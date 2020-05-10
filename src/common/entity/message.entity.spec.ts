import { MessageEntity } from './message.entity';

describe('Message', () => {
  it('should be defined', () => {
    expect(new MessageEntity()).toBeDefined();
  });
});
