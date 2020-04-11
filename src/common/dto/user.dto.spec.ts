import { CreateUserDto } from './user.dto';

describe('UserDto', () => {
  it('should be defined', () => {
    expect(new CreateUserDto()).toBeDefined();
  });
});
