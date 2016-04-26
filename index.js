import makeStore from './app/src/store';
import startServer from './app/src/server';

export const store = makeStore();
startServer(store);
