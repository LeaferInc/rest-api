import { CreateMessageDto } from './message.dto';

describe('Message', () => {
  it('should be defined', () => {
    expect(new CreateMessageDto()).toBeDefined();
  });
});
