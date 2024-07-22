package jaeseok.jaeseoklee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name = "user")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;
    @Column(unique = true, nullable = false, length = 50)
    private String user_id;
    @Column(nullable = false)
    private String user_pw;
    @Column(nullable = false)
    private String user_name;
    @Column(unique = true, nullable = false)
    private String user_num;
    @Column(nullable = false)
    private String user_date;
    @Column(unique = true, nullable = false, length = 50)
    private String user_nickname;
    @Column(nullable = false)
    private Date user_join;
    @Column(unique = true, nullable = false, length = 50)
    private String user_email;
    @Column(nullable = false)
    private int school_num;
    @Column(nullable = false)
    private int class_num;
}
