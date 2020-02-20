import * as Express from 'express';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { renderToString } from 'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';

import Routes from './Routes';
import { render } from './isomorphic/render';
import { configureStore } from './isomorphic/store';
import { initState } from './modules';

const app = Express();

app.use(Express.static(__dirname + '/public')); //bundle.jsを読み込むために
app.get(
    '*',
    (req: Express.Request, res: Express.Response) => {
        const { store, history } = configureStore(
            initState(),
            createMemoryHistory({
                initialEntries: [req.url],
                initialIndex: 0,
            }));
        const content = renderToString(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>);
        res.write(render(content, store.getState()));
        res.end();
    });

app.listen(
    3000,
    () => {
        console.log('app listening on port 3000!');
    });