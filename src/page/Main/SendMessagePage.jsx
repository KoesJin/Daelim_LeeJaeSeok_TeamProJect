/* eslint-disable */
import styles from '../../css/MainPage/SendMessagePage/SendMessagePage.module.css';

const SendMessagePage = () => {
    // 스토리지에서 값
    // schoolName 가져오기
    const schoolName = localStorage.getItem('schoolName');
    // grad 가져오기
    const grade = localStorage.getItem('grade');
    // classNum 가져오기
    const classNum = localStorage.getItem('classNum');
    // 아이디 정보
    const [userId, setUserId] = useState('');

    // 불러온 정보
    const [userData, setUserData] = useState([]);

    // 기본 메세지
    const defaultMessage = `[${schoolName} ${grade}학년 ${classNum}반에서 보내드립니다]`;

    // 메시지 내용
    const [userInput, setUserInput] = useState('');

    // 체크박스 정보 저장 - 중복 방지를 위해 new set 사용 - set 객체 사용
    const [selectedInfo, setSelectedInfo] = useState(new Set());

    // userId 가져오는 useEffect 훅
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // userId나 페이지 번호가 변경될 때 학생 정보 가져오기
    useEffect(() => {
        if (userId) {
            handleTakeInfo();
        }
    }, [userId]);

    // baseURL 설정
    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://121.139.20.242:8859';
    }

    //정보 불러오는 함수
    const handleTakeInfo = async () => {
        try {
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/user/orgSendSmsInfo?userId=${userId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
            });

            const result = await response.json();

            if (result.status === '200') {
                setUserData(result.data);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('정보를 불러올 수 없습니다');
        }
    };

    // 문자 전송 함수
    const handleSendMessage = async (e) => {
        e.preventDefault();

        const content = `${defaultMessage}\n${userInput}`;

        try {
            const bearerToken = localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
            if (!bearerToken) {
                alert('사용자가 인증되지 않았습니다.');
                return;
            }

            const response = await fetch(`${baseURL}/api/user/orgSendSms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: bearerToken,
                },
                body: JSON.stringify({
                    content,
                    // 배열로 보내야하고 위에서 selectedInfo를 Set으로 정의했음 - Arr.from 이용
                    studentNum: Array.from(selectedInfo),
                    userId,
                }),
            });

            const result = await response.json();

            if (result.status === '200') {
                alert(result.message);
                // window.location.reload();
                setUserInput('');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.log('메시지를 전송할 수 없습니다.');
        }
    };

    // 체크 박스 정보 저장 함수
    const handleSaveCheckbox = (studentNum) => {
        // 1. setSelectedInfo를 호출하여 selectedInfo 상태를 업데이트함
        setSelectedInfo((prevSelectedInfo) => {
            // 2. 현재 선택된 정보들을 담고 있는 Set을 사용해 객체로 만듦
            const updatedSelectedInfo = new Set(prevSelectedInfo);

            // 3. 이 Set 안에 현재 클릭한 studentNum이 있는지 확인함 3- 5번은 중복검사
            if (updatedSelectedInfo.has(studentNum)) {
                // 4. 만약 있다면, 이미 선택된 상태이므로 Set에서 제거 한다
                updatedSelectedInfo.delete(studentNum);
            } else {
                // 5. 없다면, 새로운 선택이므로 Set에 추가함
                updatedSelectedInfo.add(studentNum);
            }

            // 6. 업데이트된 Set을 반환하여 selectedInfo 상태가 최신 상태로 유지하게 만듦
            return updatedSelectedInfo;
        });
    };

    // 메시지 내용 변경 함수
    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.messageSection}>
                <h2>메시지 작성</h2>
                <form onSubmit={handleSendMessage} className={styles.formStyle}>
                    <div></div>
                    <textarea
                        value={userInput}
                        // onChange={(e) => setContent(e.target.value)}
                        onChange={handleInputChange}
                        className={styles.messageInput}
                        placeholder="메시지를 입력하세요..."
                    ></textarea>
                    <button className={styles.sendButton}>문자 발송</button>
                </form>
            </div>
            <div className={styles.phoneListSection}>
                <h2>전화번호 목록</h2>
                <div className={styles.phoneList}>
                    {userData.map((data, index) => (
                        <div key={index} className={styles.contactItem}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                onClick={() => handleSaveCheckbox(data.studentNum)} // studentNum을 전달
                            />
                            <span className={styles.contactName}>
                                {data.studentName} : {data.studentNum}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SendMessagePage;
