package jaeseok.jaeseoklee.controller;

import jaeseok.jaeseoklee.dto.ResponseDto;
import jaeseok.jaeseoklee.dto.SignUpDto;
import jaeseok.jaeseoklee.entity.User;
import jaeseok.jaeseoklee.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class UserController {
    @Autowired
    UserService userService;
        @PostMapping("/login")
        public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
            ResponseDto<?> result = userService.signUp(requestBody);
            return result;
        }
}
