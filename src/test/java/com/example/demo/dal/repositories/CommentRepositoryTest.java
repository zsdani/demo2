package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.Comment;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto = update"
})
class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Test
    void findCommentByallatid() {

        Comment comment1 = new Comment("komment1",2,2);
        Comment comment2 = new Comment("komment2",2,1);
        Comment comment3 = new Comment("komment3",3,3);

        commentRepository.save(comment1);
        commentRepository.save(comment2);
        commentRepository.save(comment3);

        List<Comment> result1 = commentRepository.findCommentByallatid(2);

        assertThat(result1)
                .isNotNull()
                .hasSize(2)
                .contains(comment1, comment2);
    }

    @Test
    void findCommentById() {
        /*
        Comment comment1 = new Comment("komment1",2,2);
        Comment comment2 = new Comment("komment2",2,1);
        Comment comment3 = new Comment("komment3",3,3);
        comment1.setId(0L);
        comment2.setId(1L);
        comment3.setId(2L);

        commentRepository.save(comment1);
        commentRepository.save(comment2);
        commentRepository.save(comment3);

        Comment result1 = commentRepository.findCommentById(1L);


        assertThat(result1)
                .isNotNull()
                .isEqualTo(result1);
     */
    }


}