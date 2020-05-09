import { ParticipantEntity } from './participant.entity';

describe('Participant', () => {
  it('should be defined', () => {
    expect(new ParticipantEntity()).toBeDefined();
  });
});
