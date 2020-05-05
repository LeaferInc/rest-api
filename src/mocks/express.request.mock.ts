export class ExpressRequestMock implements Express.Request {
    user: Express.User = {
        userId: 1,
        username: 'Tilkeii'
    };

    logIn = jest.fn();
    logOut = jest.fn();
    login = jest.fn();
    logout = jest.fn();
    isAuthenticated = jest.fn();
    isUnauthenticated = jest.fn();
}