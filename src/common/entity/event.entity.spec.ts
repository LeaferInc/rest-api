/**
 * @author ddaninthe
 */

import { EventEntity } from './event.entity';

describe('Event', () => {
  it('should be defined', () => {
    expect(new EventEntity()).toBeDefined();
  });
});
