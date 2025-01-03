package com.whut.blogbackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.whut.blogbackend.entity.Blog;
import com.whut.blogbackend.entity.Comment;
import com.whut.blogbackend.entity.User;
import com.whut.blogbackend.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private BlogService blogService;

    @Autowired
    private CommentMapper commentMapper;


    public List<Comment> getCommentsByBlogId(Integer id) {
        System.out.println("getCommentsByBlogId Service"+id);
        // 查询文章信息
        Blog article = blogService.getBlog(id);
        if (article != null) {
            // 查询文章关联的评论信息
            QueryWrapper<Comment> cqw=new QueryWrapper<>();
            cqw.eq("blog_id", id);
            List<Comment> comments = commentMapper.selectList(cqw);
            System.out.println(comments);
            return comments;
        }

        return null;

    }
    public Comment addComment(Comment comment) {
        if(comment != null){
            commentMapper.insert(comment);
            System.out.println(comment);
            return comment;
        }
        return null;
    }

//    public boolean deleteComment(Integer userId, Integer commentId){
//        Boolean flag=certifyComment(userId,commentId);
//        if(Boolean.TRUE.equals(flag)){
//            commentMapper.deleteById(commentId);
//            return true;
//        }
//        return false;
//    }
    public User getUserIdByCommentId(Integer id){
        User user = new User();
        user.setId(commentMapper.selectById(id).getUserId());
        return user;
    }
//    public boolean certifyComment(Integer uid, Integer cid){
//        QueryWrapper<Comment> qw = new QueryWrapper<>();
//        qw.eq("user_id", uid);
//        List<Comment> commentList = commentMapper.selectList(qw);
//        for(Comment info: commentList){
//            if(Objects.equals(info.getId(), cid)){
//                return true;
//            }
//        }
//        return false;
//    }
}
