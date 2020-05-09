import { CreateParticipantDto } from './participant.dto';

describe('Participant', () => {
  it('should be defined', () => {
    expect(new CreateParticipantDto()).toBeDefined();
  });
});
