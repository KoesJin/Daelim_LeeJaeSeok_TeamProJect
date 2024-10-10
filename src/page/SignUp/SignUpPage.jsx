import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/SignUpPage/SignUpPage.module.css'; // CSS 모듈 import
import MainLogo from '../../img/TeacHub.png'; // 로고 이미지 import

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
    const handleCheckuserId = async (e) => {
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
            const duplicateTest_response = await fetch(`${baseURL}/api/user/checkId`, {
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
            const duplicateTest_response = await fetch(`${baseURL}/api/user/checkNum`, {
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
        <div className={styles.container}>
            <img src={MainLogo} alt="TeacHub Logo" className={styles.logo} />

            <form className={styles.form} onSubmit={handleSignUp}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className={styles.inputField}
                        maxLength={20} // 아이디 최대 20자
                    />
                    <button type="button" className={styles.checkButton} onClick={handleCheckuserId}>
                        중복 확인
                    </button>
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={userPw}
                        onChange={(e) => setUserPw(e.target.value)}
                        className={styles.inputField}
                        maxLength={20} // 비밀번호 최대 20자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={userConPw}
                        onChange={(e) => setUserConPw(e.target.value)}
                        className={styles.inputField}
                        maxLength={20} // 비밀번호 확인 최대 20자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="이름"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={styles.inputField}
                        maxLength={5} // 이름 최대 5자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="전화번호"
                        value={userNum}
                        onChange={(e) => setUserNum(e.target.value)}
                        className={styles.inputField}
                        maxLength={11} // 전화번호 최대 11자 (010-1234-5678)
                    />
                    <button type="button" className={styles.checkButton} onClick={handleCheckuserNum}>
                        중복 확인
                    </button>
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="date"
                        placeholder="생년월일"
                        value={userDate}
                        onChange={(e) => setUserDate(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="email"
                        placeholder="이메일"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className={styles.inputField}
                        maxLength={25} // 이메일 최대 25자
                        disabled={isEmailVerified}
                    />
                    {!isEmailVerified && (
                        <button type="button" className={styles.checkButton} onClick={handleCheckuserEmail}>
                            인증하기
                        </button>
                    )}
                </div>

                {isCodeSent && (
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="인증번호"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            className={styles.inputField}
                            maxLength={6}
                            disabled={isEmailVerified}
                        />
                        {!isEmailVerified && (
                            <button type="button" className={styles.checkButton} onClick={handleVerifyCode}>
                                인증
                            </button>
                        )}
                    </div>
                )}

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="학교명"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className={styles.inputField}
                        maxLength={15} // 학교명 최대 15자
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="반"
                        value={classNum}
                        onChange={(e) => setClassNum(e.target.value)}
                        className={styles.inputField}
                        maxLength={2} // 반 최대 2자
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.signUpButton}>
                        회원가입
                    </button>
                    <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
                        뒤로가기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;
