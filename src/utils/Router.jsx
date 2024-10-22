import { createBrowserRouter } from 'react-router-dom';

import Root from '../Root';
import MainPage from '../page/Main/Main';
import LoginPage from '../page/Login/LoginPage';
import StudentManagementPage from '../page/Main/StudentManagementPage';
import AIWorkbookPage from '../page/Main/AIWorkBookPage/AIWorkbookPage';
import SchedulePage from '../page/Main/SchedulePage/SchedulePage';
import SendMessagePage from '../page/Main/SendMessagePage';
import SeatAssignmentPage from '../page/Main/SeatAssignmentPage';
import SignUpPage from '../page/SignUp/SignUpPage';
import CheckSignUpPage from '../page/SignUp/CheckSignUpPage';
import CheckInformation from '../page/Header/Info/CheckInformation';
import PersonalInfoChange from '../page/Header/Info/PersonalInfoChange';
import PasswordChange from '../page/Header/Info/PasswordChange';
import ToolPage from '../page/Main/ToolPage';
import CheckFindPw from '../page/Login/FindPassword/CheckFindPw';
import CheckFindId from '../page/Login/FindId/CheckFindId';
import MyPage from '../page/Header/Info/MyPage';
import FindIdEmail from '../page/Login/FindId/FindId_Email';
import FindIdPhone from '../page/Login/FindId/FindId_phone';
import FindPasswordEmail from '../page/Login/FindPassword/FindPassword_email';
import FindPasswordPhone from '../page/Login/FindPassword/FindPassword_phone';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        // errorElement: <ErrorPage />, 에러페이지
        children: [
            // 기본 경로 로그인 페이지
            {
                path: '',
                element: <LoginPage />,
            },
            //아이디 찾기
            {
                path: '/checkfindid',
                element: <CheckFindId />,
            },
            {
                path: '/findid-email',
                element: <FindIdEmail />,
            },
            {
                path: '/findid-phone',
                element: <FindIdPhone />,
            },
            //비밀번호 찾기
            {
                path: '/checkfindpassword',
                element: <CheckFindPw />,
            },
            {
                path: '/findpassword-email',
                element: <FindPasswordEmail />,
            },
            {
                path: '/findpassword-phone',
                element: <FindPasswordPhone />,
            },
            //회원가입 선택 창
            {
                path: '/checksignuppage',
                element: <CheckSignUpPage />,
            },
            //회원가입
            {
                path: '/signuppage',
                element: <SignUpPage />,
            },
            //메인페이지
            {
                path: '/mainpage',
                element: <MainPage />,
            },
            // 정보수정 페이지
            {
                path: '/checkinfo',
                element: <CheckInformation />,
            },
            // 마이페이지
            {
                path: '/mypage',
                element: <MyPage />,
            },
            // 정보 변경 페이지
            {
                path: '/personalinfo',
                element: <PersonalInfoChange />,
            },
            // 비밀번호 변경 페이지
            {
                path: '/passwordchange',
                element: <PasswordChange />,
            },
            // 학생관리 페이지
            {
                path: '/studentmanagement',
                element: <StudentManagementPage />,
            },
            // Ai 문제집 페이지
            {
                path: '/ai-workbook',
                element: <AIWorkbookPage />,
            },
            // 시간표 페이지
            {
                path: '/schedule',
                element: <SchedulePage />,
            },
            // 수업 도구 페이지
            {
                path: '/tool',
                element: <ToolPage />,
            },
            // 문자 발송 페이지
            {
                path: '/send-message',
                element: <SendMessagePage />,
            },
            // 자리 배치 페이지
            {
                path: '/seat-assignment',
                element: <SeatAssignmentPage />,
            },
        ],
    },
]);

export default router;
