import { LocalAuthentificationGuard } from './local-authentification.guard';

describe('LocalAuthentificationGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthentificationGuard()).toBeDefined();
  });
});
