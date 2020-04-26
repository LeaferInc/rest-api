import { EventEntity } from "src/common/entity/event.entity"
import { UserEntity } from "src/common/entity/user.entity";

export class EventServiceMock {
    static testUser: UserEntity = new UserEntity();
    static testEvent1: EventEntity = new EventEntity();
    static testEvent2: EventEntity = new EventEntity();
    static testEvents: EventEntity[] = [EventServiceMock.testEvent1, EventServiceMock.testEvent2];

    static setup() {
        this.testUser.id = 1;
        this.testUser.biography = 'Test biography';
        this.testUser.birthdate = new Date(2000, 1, 4);
        this.testUser.firstname = 'John';
        this.testUser.lastname = 'Doe';

        EventServiceMock.testEvent1.id = 1;
        EventServiceMock.testEvent1.name = 'Test event';
        EventServiceMock.testEvent1.description = 'Description for testing';
        EventServiceMock.testEvent1.location = '76, Test St.';
        EventServiceMock.testEvent1.startDate = new Date(2020, 3, 13, 10);
        EventServiceMock.testEvent1.endDate = new Date(2020, 3, 10, 16);
        EventServiceMock.testEvent1.price = 5;
        EventServiceMock.testEvent1.maxPeople = 20;
        EventServiceMock.testEvent1.latitude = 46.7887;
        EventServiceMock.testEvent1.longitude = 5.1256;
        EventServiceMock.testEvent1.entrants = [this.testUser];

        EventServiceMock.testEvent2.id = 1;
        EventServiceMock.testEvent2.name = 'Another Test event';
        EventServiceMock.testEvent2.description = 'Description for another testing';
        EventServiceMock.testEvent2.location = '2, Another Test city';
        EventServiceMock.testEvent2.startDate = new Date(2020, 3, 15, 20);
        EventServiceMock.testEvent2.endDate = new Date(2020, 3, 16, 0);
        EventServiceMock.testEvent2.price = 0;
        EventServiceMock.testEvent2.maxPeople = 150;
        EventServiceMock.testEvent2.latitude = 42.12;
        EventServiceMock.testEvent2.longitude = 3.57;
        EventServiceMock.testEvent2.entrants = [];
    }

    static mock = {
        findAll: jest.fn(() => EventServiceMock.testEvents),
        findOne: jest.fn((id: number) => EventServiceMock.testEvents[id - 1]),
    }
}