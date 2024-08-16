import { createBrowserRouter } from 'react-router-dom';

import Root from '../Root';
import MainPage from '../page/MainPage';
import LoginPage from '../page/LoginPage';
import StudentManagementPage from '../page/StudentManagementPage';
import AIWorkbookPage from '../page/AIWorkbookPage';
import SchedulePage from '../page/SchedulePage';
import VotePage from '../page/VotePage';
import SendMessagePage from '../page/SendMessagePage';
import SeatAssignmentPage from '../page/SeatAssignmentPage';
import SignUpPage from '../page/SignUpPage';

const router = createBrowserRouter([
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
                path: '/signuppage',
                element: <SignUpPage />,
            },
            {
                path: '/mainpage',
                element: <MainPage />,
            },
            {
                path: '/student-management',
                element: <StudentManagementPage />,
            },
            {
                path: '/ai-workbook',
                element: <AIWorkbookPage />,
            },
            {
                path: '/schedule',
                element: <SchedulePage />,
            },
            {
                path: '/vote',
                element: <VotePage />,
            },
            {
                path: '/send-message',
                element: <SendMessagePage />,
            },
            {
                path: '/seat-assignment',
                element: <SeatAssignmentPage />,
            },
        ],
    },
]);

export default router;
