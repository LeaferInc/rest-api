import { UserEntity } from "src/common/entity/user.entity";
import { EventEntity } from "src/common/entity/event.entity";


const testUser = new UserEntity();
const testEvent1 = new EventEntity();
const testEvent2 = new EventEntity();
testUser.id = 1;
testUser.biography = 'Test biography';
testUser.birthdate = new Date(2000, 1, 4);
testUser.firstname = 'John';
testUser.lastname = 'Doe';

testEvent1.id = 1;
testEvent1.name = 'Test event';
testEvent1.description = 'Description for testing';
testEvent1.location = '76, Test St.';
testEvent1.startDate = new Date(2020, 3, 13, 10);
testEvent1.endDate = new Date(2020, 3, 10, 16);
testEvent1.price = 5;
testEvent1.maxPeople = 20;
testEvent1.latitude = 46.7887;
testEvent1.longitude = 5.1256;
testEvent1.entrants = [testUser];

testEvent2.id = 2;
testEvent2.name = 'Another Test event';
testEvent2.description = 'Description for another testing';
testEvent2.location = '2, Another Test city';
testEvent2.startDate = new Date(2020, 3, 15, 20);
testEvent2.endDate = new Date(2020, 3, 16, 0);
testEvent2.price = 0;
testEvent2.maxPeople = 150;
testEvent2.latitude = 42.12;
testEvent2.longitude = 3.57;
testEvent2.entrants = [];

export const eventRepositoryMock = {
    find: jest.fn(() => [testEvent1, testEvent2]),
    findOne: jest.fn((id) => id === 1 ? testEvent1 : id === 2 ? testEvent2 : null),
    save: jest.fn((event: EventEntity) => event),
}