import { UserEntity } from "src/common/entity/user.entity";

export class UserServiceMock {
    static testUser = new UserEntity();

    static setup() {
        this.testUser.id = 1;
        this.testUser.biography = 'Test biography';
        this.testUser.birthdate = new Date(2000, 1, 4);
        this.testUser.firstname = 'John';
        this.testUser.lastname = 'Doe';
    }

    static mock = {
        findOne: jest.fn((id) => UserServiceMock.testUser)
    }
}