import { createBrowserRouter } from 'react-router-dom';

import Root from '../Root';
import MainPage from '../page/MainPage';
import LoginPage from '../page/LoginPage';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root />,
            // errorElement: <ErrorPage />, 에러페이지
            children: [
                {
                    path: '',
                    element: <LoginPage />,
                },
                {
                    path: '/mainpage',
                    element: <MainPage />,
                },
            ],
        },
    ]

    // {    gh-pages 연결용 코드
    //     basename: `${process.env.PUBLIC_URL}`,
    // }
);

export default router;
