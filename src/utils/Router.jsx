import { createBrowserRouter } from 'react-router-dom';

import Root from '../Root';
import MainPage from '../page/Main/MainPage';
import LoginPage from '../page/Login/LoginPage';
import StudentManagementPage from '../page/Main/StudentManagementPage';
import AIWorkbookPage from '../page/Main/AIWorkbookPage';
import SchedulePage from '../page/Main/SchedulePage';
import VotePage from '../page/Main/VotePage';
import SendMessagePage from '../page/Main/SendMessagePage';
import SeatAssignmentPage from '../page/Main/SeatAssignmentPage';
import SignUpPage from '../page/SignUp/SignUpPage';
import CheckSignUpPage from '../page/SignUp/CheckSignUpPage';
import CheckInformation from '../page/Header/Info/CheckInformation';
import Settings from '../page/Header/Info/Settings';
import PersonalInfoChange from '../page/Header/Info/PersonalInfoChange';
import PasswordChange from '../page/Header/Info/PasswordChange';

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
                path: '/checksignuppage',
                element: <CheckSignUpPage />,
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
                path: '/checkinfo',
                element: <CheckInformation />,
            },
            {
                path: '/setting',
                element: <Settings />,
            },
            {
                path: '/personalinfo',
                element: <PersonalInfoChange />,
            },
            {
                path: '/passwordchange',
                element: <PasswordChange />,
            },
            {
                path: '/studentmanagement',
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
