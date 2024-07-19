package jaeseok.jaeseoklee.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    private String user_id;
    private String user_pw;
    private String user_name;
    private String user_num;
    private String user_date;
    private String user_nickname;
    private Date user_join;
    private String user_email;
    private int school_num;
    private int class_num;
}
