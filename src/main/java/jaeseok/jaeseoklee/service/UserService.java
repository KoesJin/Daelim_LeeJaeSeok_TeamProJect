package jaeseok.jaeseoklee.service;

import jaeseok.jaeseoklee.dto.ResponseDto;
import jaeseok.jaeseoklee.dto.SignUpDto;
import jaeseok.jaeseoklee.entity.User;
import jaeseok.jaeseoklee.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {
    @Autowired
    UserRepository userRepository;

    public ResponseDto<?> signUp(SignUpDto dto) {
        String user_id = dto.getUser_id();
        String password = dto.getUser_pw();
        String confirmPassword = dto.getUser_conPw();

        // id 중복 확인
//        try {
//            // 존재하는 경우 : true / 존재하지 않는 경우 : false
//            if(userRepository.existsByUserId(user_id)) {
//                return ResponseDto.setFailed("중복된 아이디입니다.");
//            }
//        } catch (Exception e) {
//            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
//        }

        // password 중복 확인
        if(!password.equals(confirmPassword)) {
            return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
        }

        // UserEntity 생성
        User user = new User(dto);

        // UserRepository를 이용하여 DB에 Entity 저장 (데이터 적재)
        try {
            userRepository.save(user);
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        return ResponseDto.setSuccess("회원 생성에 성공했습니다.");
    }
}
