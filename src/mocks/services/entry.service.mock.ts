import { EventEntity } from "src/common/entity/event.entity"
import { UserEntity } from "src/common/entity/user.entity";

export class EntryServiceMock {
    static testUser: UserEntity = new UserEntity();
    static testEvent1: EventEntity = new EventEntity();
    static testEvent2: EventEntity = new EventEntity();
    static testEvents: EventEntity[] = [EntryServiceMock.testEvent1, EntryServiceMock.testEvent2];

    static setup() {
        this.testUser.id = 1;
        this.testUser.biography = 'Test biography';
        this.testUser.birthdate = new Date(2000, 1, 4);
        this.testUser.firstname = 'John';
        this.testUser.lastname = 'Doe';

        this.testEvent1.id = 1;
        this.testEvent1.name = 'Test event';
        this.testEvent1.description = 'Description for testing';
        this.testEvent1.location = '76, Test St.';
        this.testEvent1.startDate = new Date(2020, 3, 13, 10);
        this.testEvent1.endDate = new Date(2020, 3, 10, 16);
        this.testEvent1.price = 5;
        this.testEvent1.maxPeople = 20;
        this.testEvent1.latitude = 46.7887;
        this.testEvent1.longitude = 5.1256;
        this.testEvent1.entrants = [this.testUser];

        this.testEvent2.id = 2;
        this.testEvent2.name = 'Another Test event';
        this.testEvent2.description = 'Description for another testing';
        this.testEvent2.location = '2, Another Test city';
        this.testEvent2.startDate = new Date(2020, 3, 15, 20);
        this.testEvent2.endDate = new Date(2020, 3, 16, 0);
        this.testEvent2.price = 0;
        this.testEvent2.maxPeople = 150;
        this.testEvent2.latitude = 42.12;
        this.testEvent2.longitude = 3.57;
        this.testEvent2.entrants = [];
    }

    static mock = {
        joinEvent: jest.fn((eventId: number) => {
            const event = EntryServiceMock.testEvents.find((event: EventEntity) => event.id === eventId);
            if (event) {
                event.entrants.push(EntryServiceMock.testUser);
            }
        }),
        unjoinEvent: jest.fn((eventId: number, userId: number) => {
            const event = EntryServiceMock.testEvents.find((event: EventEntity) => event.id === eventId);
            const index = EntryServiceMock.testEvents.indexOf(event);
            if (index > -1) {
                event.entrants.splice(index, 1);
            }
        }),
        entryState: jest.fn((eventId: number, userId: number) => {
            const event = EntryServiceMock.testEvents.find((event: EventEntity) => event.id === eventId);
            return event.entrants.find(user => user.id === userId) != undefined;
        }),
    }
}