package com.example.demo.controllers;

import com.example.demo.dal.dto.AppUserDto;
import com.example.demo.dal.entities.Comment;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.services.CommentService;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api/comment")
public class CommentController {



    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

/*
    // api/movie/id?id=5
    @GetMapping("/id")
    public ResponseEntity<Comment> findCommentById(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(commentService.findCommentById(id));
    }
    */

    @GetMapping("/all/allatid")
    public ResponseEntity<List<Comment>> findCommentsByallatid(@RequestParam long allatid) throws DataNotFoundException {
        return ResponseEntity.ok(commentService.findCommentsByallatid(allatid));
    }

    @GetMapping("/id")
    public ResponseEntity<Comment> findaCommentById(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(commentService.findCommentById(id));
    }

    @PutMapping("/up/id")
    public ResponseEntity<Comment> updateComment(@RequestBody Comment comment, @RequestParam long id) throws DataNotFoundException{
        System.out.println(comment);
        return ResponseEntity.ok(commentService.updateComment(id, comment));
    }


    @PostMapping()
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.addComment(comment));
    }

    @DeleteMapping("/del/id")
    public void deleteOwner(@RequestParam long id) throws DataNotFoundException {
         commentService.deleteComment(id);
    }
        /*

    @PutMapping
    public ResponseEntity<Comment> updateComment(@RequestBody Comment comment) {

        return ResponseEntity.ok(commentService.updateComment( comment));


    }

    @DeleteMapping
    public ResponseEntity<Comment> deleteComment(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(commentService.deleteComment(id));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Comment appUser) {
        return ResponseEntity.ok(commentService.login(appUser));
    }

 */


}
