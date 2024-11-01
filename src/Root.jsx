import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, styled } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header/Header';
import { ChatProvider } from './utils/context/ChatContext'; // ChatProvider import

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch; /* 모바일에서 부드러운 스크롤을 위해 추가 */
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      overflow-y: hidden; /* 가로 스크롤을 막고 세로 스크롤은 허용 */
    }

    .fade-enter {
      opacity: 0;
    }

    .fade-enter-active {
      opacity: 1;
      transition: opacity 250ms ease-in;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
      transition: opacity 250ms ease-out;
    }
`;

const AnimationContainer = styled.div`
    width: 100%;
`;

function Root() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const accessToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
        if (
            !accessToken &&
            location.pathname !== '/signuppage' &&
            location.pathname !== '/checksignuppage' &&
            location.pathname !== '/findpassword-email' &&
            location.pathname !== '/findpassword-phone' &&
            location.pathname !== '/checkfindid' &&
            location.pathname !== '/findid-email' &&
            location.pathname !== '/findid-phone' &&
            location.pathname !== '/checkfindpassword'
        ) {
            navigate('/');
        }
    }, [navigate, location.pathname]);

    return (
        <ChatProvider>
            <Helmet>
                <title>TeacHub</title>
            </Helmet>
            <GlobalStyle />
            {location.pathname !== '/' &&
                location.pathname !== '/signuppage' &&
                location.pathname !== '/checksignuppage' &&
                location.pathname !== '/findpassword-email' &&
                location.pathname !== '/findpassword-phone' &&
                location.pathname !== '/checkfindid' &&
                location.pathname !== '/findid-email' &&
                location.pathname !== '/findid-phone' &&
                location.pathname !== '/checkfindpassword' && <Header />}
            <TransitionGroup>
                <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                    <AnimationContainer>
                        <Outlet />
                    </AnimationContainer>
                </CSSTransition>
            </TransitionGroup>
        </ChatProvider>
    );
}

export default Root;
