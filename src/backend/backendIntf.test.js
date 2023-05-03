import { acceptUserQuery, UserQueryConfig } from "./backendIntf";

test('user query: when accepting correct typed arguments, should return non-empty string', async() => {
    const config = new UserQueryConfig(1);
    config.algorithm = 'KMP';
    await expect(acceptUserQuery('lorem', config)).resolves.toHaveProperty('answer');
});

test('user query: when accepting non-string query, should reject with TypeError', async() => {
    const config = new UserQueryConfig(1);
    config.algorithm = 'KMP';
    expect.assertions(1);
    await expect(acceptUserQuery(170, config)).rejects.toBeInstanceOf(TypeError);
});

test('user query: when accepting null as config, should reject with TypeError', async() => {
    expect.assertions(1);
    await expect(acceptUserQuery('hello', null)).rejects.toBeInstanceOf(TypeError);
});

test('user query: when accepting wrong-typed object as config, should reject with TypeError', async() => {
    expect.assertions(1);
    await expect(acceptUserQuery('hello', {historyId: 1, requestNewHistoryId: false})).rejects.toBeInstanceOf(TypeError);
});

test('query config: when creating config with a known history id, should not request new id', () => {
    const config = new UserQueryConfig(1);
    expect(config.requestNewHistoryId).toBeFalsy();
});

test('query config: when creating config with no history id, should request new id', () => {
    const config = new UserQueryConfig();
    expect(config.requestNewHistoryId).toBeTruthy();
});

test('query config: when requesting new id, should remove previous id', () => {
    const config = new UserQueryConfig(1);
    config.requestNewHistoryId = true;
    expect(config.historyId).toBeUndefined();
});

test('query config: when assigning history id to config, should resolve id request', () => {
    const config = new UserQueryConfig();
    config.historyId = 1;
    expect(config.requestNewHistoryId).toBeFalsy();
});
