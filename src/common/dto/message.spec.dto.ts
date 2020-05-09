import { Message } from './message.dto';

describe('Message', () => {
  it('should be defined', () => {
    expect(new Message()).toBeDefined();
  });
});
