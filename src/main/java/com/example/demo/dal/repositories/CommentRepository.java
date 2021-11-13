package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Comment;
import com.example.demo.dal.entities.Owner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {


    List<Comment> findCommentByallatid(long allatid);
    Comment findCommentById(long id);


}

