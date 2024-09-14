import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/SignUpPage/SignUpPage.module.css'; // CSS 모듈 import
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaCalendarAlt,
    FaSchool,
    FaChalkboardTeacher,
    FaKey,
} from 'react-icons/fa'; // Font Awesome 아이콘 import

function SignUpPage() {
    //회원가입 정보
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userConPw, setUserConPw] = useState('');
    const [userName, setUserName] = useState('');
    const [userNum, setUserNum] = useState('');
    const [userDate, setUserDate] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [classNum, setClassNum] = useState('');

    // 인증번호
    const [inputCode, setInputCode] = useState('');

    // 아이디 , 전화번호 중복체크 정보
    const [idDuplicateChecked, setIdDuplicateChecked] = useState(false);
    const [numDuplicateChecked, setNumDuplicateChecked] = useState(false);

    // 이메일 중복체크 및 인증
    const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);

    // 인증번호 요청 상태
    const [isCodeSent, setIsCodeSent] = useState(false);

    // 이메일 인증 완료 상태
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    // navigate 훅
    const navigate = useNavigate();

    //baseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    //아이디 중복체크 함수
    const handleCheckuserName = async (e) => {
        e.preventDefault();

        // 아이디가 비어있는지 확인
        if (!userId) {
            alert('아이디를 입력해 주세요.');
            return;
        }

        // 아이디가 5~20자인지 확인
        if (userId.length < 5 || userId.length > 20) {
            alert('아이디는 5자에서 20자 사이여야 합니다.');
            return;
        }

        // 아이디가 영어와 숫자로만 구성되었는지 확인
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(userId)) {
            alert('아이디는 영어와 숫자만 사용할 수 있습니다.');
            return;
        }

        try {
            // 중복 검사 앤드포인트
            const duplicateTest_response = await fetch(`${baseURL}/api/user/checkId/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userId,
                }),
            });

            // 응답 결과 처리
            const result = await duplicateTest_response.json();
            console.log(result);

            if (result.status === '200') {
                alert(result.message);
                setIdDuplicateChecked(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during username check:', error);
            alert('중복 검사 중 오류가 발생했습니다.');
        }
    };

    //전화번호 중복체크 함수
    const handleCheckuserNum = async (e) => {
        e.preventDefault();

        // 전화번호가 비어있는지 확인
        if (!userNum) {
            alert('전화번호를 입력해 주세요.');
            return;
        }

        // 전화번호가 11자리이며, 숫자로만 이루어져 있는지 확인
        const phoneRegex = /^010\d{8}$/;
        if (!phoneRegex.test(userNum)) {
            alert('전화번호는 010으로 시작하고, "-"를 제외한 11자리 숫자로만 이루어져야 합니다. 예: 01012345678');
            return;
        }

        try {
            // 중복 검사 앤드포인트
            const duplicateTest_response = await fetch(`${baseURL}/api/user/checkNum/${userNum}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userNum,
                }),
            });

            // 응답 결과 처리
            const result = await duplicateTest_response.json();

            if (result.status === '200') {
                alert(result.message);
                setNumDuplicateChecked(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during username check:', error);
            alert('중복 검사 중 오류가 발생했습니다.');
        }
    };

    // 이메일 인증 함수
    const handleCheckuserEmail = async (e) => {
        e.preventDefault();

        // 이메일이 비어있는지 확인
        if (!userEmail) {
            alert('이메일을 입력해 주세요.');
            return;
        }

        try {
            // 중복 검사 앤드포인트
            const duplicateTest_response = await fetch(`${baseURL}/api/user/checkEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                }),
            });

            // 응답 결과 처리
            const result = await duplicateTest_response.json();
            console.log(result);

            if (result.status === '200') {
                alert(result.message);
                setEmailDuplicateChecked(true);
                setIsCodeSent(true); // 인증번호 입력란 활성화
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during username check:', error);
            alert('이메일 인증 도중 오류가 발생했습니다.');
        }
    };

    // 이메일 인증번호 확인 함수
    const handleVerifyCode = async (e) => {
        e.preventDefault();

        if (!inputCode) {
            alert('인증번호를 입력해 주세요.');
            return;
        }

        try {
            // 중복 검사 앤드포인트
            const duplicateTest_response = await fetch(`${baseURL}/api/user/verificationSignUpEmailCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    inputCode,
                }),
            });

            // 응답 결과 처리
            const result = await duplicateTest_response.json();
            console.log(result);

            if (result.status === '200') {
                alert(result.message);
                setIsEmailVerified(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during username check:', error);
            alert('인증코드 인증 도중 오류가 발생했습니다.');
        }
    };

    //회원가입 함수
    const handleSignUp = async (e) => {
        e.preventDefault();

        //유효성 검사
        if (!userId || !userPw || !userConPw || !userName || !userNum || !userEmail || !schoolName || !classNum) {
            alert('모든 필드를 작성해 주세요.');
            return;
        }

        // 아이디 중복 체크 코드
        if (!idDuplicateChecked) {
            alert('아이디 중복 확인을 먼저 해주세요.');
            return;
        }

        // 전화번호 중복 체크 코드
        if (!numDuplicateChecked) {
            alert('전화번호 중복 확인을 먼저 해주세요.');
            return;
        }

        // 이메일 중복 체크 코드
        if (!emailDuplicateChecked) {
            alert('이메일 인증을 먼저 해주세요.');
            return;
        }

        if (!isEmailVerified) {
            alert('인증번호 인증을 먼저 해주세요.');
            return;
        }

        // 비밀번호 유효성 검사 (최소 8자, 영어와 숫자 포함, 한글 미포함)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~`|}{[\]:;?\/><.,]{8,}$/;
        const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if (!passwordRegex.test(userPw)) {
            alert('비밀번호는 최소 8자 이상이어야 하며, 영어와 숫자를 포함해야 합니다.');
            return;
        }

        if (koreanRegex.test(userPw)) {
            alert('비밀번호에 한글은 포함될 수 없습니다.');
            return;
        }

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (userPw !== userConPw) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const nameRegex = /^[가-힣]{2,5}$/;
        if (!nameRegex.test(userName)) {
            alert('이름은 2자에서 5자 사이의 한글만 입력 가능합니다.');
            return;
        }

        const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dateRegex.test(userDate)) {
            alert('생년월일은 정상적인 형식으로 입력해 주세요.');
            return;
        }

        const schoolRegex = /^[가-힣]{5,15}$/;
        if (!schoolRegex.test(schoolName)) {
            alert('학교이름은 5자에서 15자 사이의 한글만 입력 가능합니다.');
            return;
        }

        const classRegex = /^\d{1,2}$/;
        if (!classRegex.test(classNum)) {
            alert('반은 1~99의 숫자로만 이루어져 있어야 합니다.');
            return;
        }

        try {
            //회원가입 앤드포인트
            const signUp_response = await fetch(`${baseURL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    userPw,
                    userConPw,
                    userName,
                    userNum,
                    userDate,
                    userEmail,
                    schoolName,
                    classNum,
                }),
            });

            // json 변환
            const result = await signUp_response.json();

            if (result.status === '200') {
                alert(result.message);
                navigate('/');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.log('에러입니다.');
        }
    };

    return (
        <div className={styles.ScrollContainer}>
            <div className={styles.SignUpBody}>
                <div className={styles.container}>
                    <h1 className={styles.title}>TeacHub</h1>
                    <form className={styles.form} onSubmit={handleSignUp}>
                        <div className={styles.inputContainer}>
                            <FaUser className={styles.icon} />
                            <input
                                type="text"
                                placeholder="아이디"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="20"
                            />
                            <button type="button" className={styles.duplicateButton} onClick={handleCheckuserName}>
                                중복 확인
                            </button>
                        </div>
                        <div className={styles.inputContainer}>
                            <FaLock className={styles.icon} />
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={userPw}
                                onChange={(e) => setUserPw(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="20"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <FaLock className={styles.icon} />
                            <input
                                type="password"
                                placeholder="비밀번호 확인"
                                value={userConPw}
                                onChange={(e) => setUserConPw(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="20"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <FaUser className={styles.icon} />
                            <input
                                type="text"
                                placeholder="이름"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="5"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <FaPhone className={styles.icon} />
                            <input
                                type="text"
                                placeholder="전화번호"
                                value={userNum}
                                onChange={(e) => setUserNum(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="11"
                            />
                            <button type="button" className={styles.duplicateButton} onClick={handleCheckuserNum}>
                                중복 확인
                            </button>
                        </div>
                        <div className={styles.inputContainer}>
                            <FaCalendarAlt className={styles.icon} />
                            <input
                                type="date"
                                placeholder="생년월일"
                                value={userDate}
                                onChange={(e) => setUserDate(e.target.value)}
                                className={styles.signUpInput}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <FaEnvelope className={styles.icon} />
                            <input
                                type="email"
                                placeholder="이메일"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="25"
                                disabled={isEmailVerified} // 인증 요청 후 비활성화
                            />
                            {!isEmailVerified && (
                                <button type="button" className={styles.duplicateButton} onClick={handleCheckuserEmail}>
                                    이메일 인증
                                </button>
                            )}
                        </div>

                        {/* 인증번호 입력칸 및 인증 버튼 */}
                        {isCodeSent && (
                            <div className={styles.inputContainer}>
                                <FaKey className={styles.icon} />
                                <input
                                    type="text"
                                    placeholder="인증번호 입력"
                                    value={inputCode}
                                    onChange={(e) => setInputCode(e.target.value)}
                                    className={styles.signUpInput}
                                    disabled={isEmailVerified} // 인증 완료 시 입력 칸도 비활성화 가능
                                    maxLength="6"
                                />
                                {!isEmailVerified && (
                                    <button type="button" className={styles.duplicateButton} onClick={handleVerifyCode}>
                                        인증
                                    </button>
                                )}
                            </div>
                        )}

                        {isEmailVerified && <p>이메일 인증이 완료되었습니다.</p>}

                        <div className={styles.inputContainer}>
                            <FaSchool className={styles.icon} />
                            <input
                                type="text"
                                placeholder="학교명"
                                value={schoolName}
                                onChange={(e) => setSchoolName(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="15"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <FaChalkboardTeacher className={styles.icon} />
                            <input
                                type="text"
                                placeholder="반"
                                value={classNum}
                                onChange={(e) => setClassNum(e.target.value)}
                                className={styles.signUpInput}
                                maxLength="2"
                            />
                        </div>
                        <button type="submit" className={styles.button}>
                            회원가입
                        </button>
                        <button className={styles.button} onClick={() => navigate('/')}>
                            로그인
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
