package jaeseok.jaeseoklee.controller;

import jaeseok.jaeseoklee.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@CrossOrigin(origins = "https://localhost:3000")
@Controller
public class UserController {
        @PostMapping("/login")
        public String signUp(@ModelAttribute("user") User user){


            return null;
        }
}
