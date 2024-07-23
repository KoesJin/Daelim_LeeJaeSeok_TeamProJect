package jaeseok.jaeseoklee.repository;

import jaeseok.jaeseoklee.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//    boolean existsByUserId(String user_id);
}
