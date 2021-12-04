package com.example.demo.services;

import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Comment;
import com.example.demo.dal.entities.Comment;
import com.example.demo.dal.repositories.CommentRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @Before("")
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void findCommentsByallatid() {
    }



    @Test
    void updateComment() throws DataNotFoundException {
        Comment comment = new Comment();
        comment.setId(1L);
        comment.setComment("komment");
        commentRepository.save(comment);
        Mockito.when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        comment.setComment("komment");
        Mockito.when(commentRepository.save(comment)).thenReturn(comment);
        assertThat(commentService.updateComment(1,comment)).isEqualTo(comment);
    }

    @Test
    void addComment() {
        Comment comment = new Comment();
        comment.setComment("komment");

        Mockito.when(commentRepository.save(comment)).thenReturn(comment);

        assertThat(commentService.addComment(comment)).isEqualTo(comment);
    }


}