package com.example.demo.services;

import com.example.demo.dal.dto.AppUserDto;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Comment;
import com.example.demo.dal.repositories.CommentRepository;
import com.example.demo.security.JwtTokenManager;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@SessionScope
public class CommentService {


    private final CommentRepository commentRepository;



    @Autowired
    public CommentService(CommentRepository commentRepository ) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> findCommentsByallatid (long allatid){
        return commentRepository.findCommentByallatid(allatid);
    }

    public Comment addComment(Comment comment) {
        comment.setStatus(EntityStatus.ACTIVE);
        return commentRepository.save(comment);
    }
    /*

    public List<AppUserDto> findAllComments() {
        return ((List<Comment>) commentRepository.findAll())
                .stream()
                .map(AppUserDto::new)
                .collect(Collectors.toList());
    }



    public Comment findCommentById(long id) throws DataNotFoundException {
        return commentRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Comment by id " + id + " not found!"));
    }

    public Comment findCommentByUsername(String username) throws DataNotFoundException {
        return  commentRepository.findCommentByUsername(username)
                .orElseThrow(() -> new DataNotFoundException("Comment by username " + username + " not found!"));
    }



    public Comment deleteComment(long id) throws DataNotFoundException {
        Comment comment = findCommentById(id);

        comment.setStatus(EntityStatus.DELETED);

        return commentRepository.save(comment);
    }


    public Comment updateComment( Comment comment){

        Optional<Comment> tmp = commentRepository.findById(comment.getId());


        comment.setId(tmp.get().getId());
        return commentRepository.save(comment);
    }



    public String login(Comment appUser) {
        Comment userToLogin = commentRepository.findCommentByUsernameAndPassword(appUser.getUsername(),
                        appUser.getPassword())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user credentials!"));

        return jwtTokenManager.createTokenByUser(userToLogin);
    }

     */

}
