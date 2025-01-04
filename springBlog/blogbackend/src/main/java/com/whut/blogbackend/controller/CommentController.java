package com.whut.blogbackend.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.whut.blogbackend.entity.Comment;
import com.whut.blogbackend.entity.Result;
import com.whut.blogbackend.entity.User;
import com.whut.blogbackend.service.CommentService;
import com.whut.blogbackend.tools.Tool;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @ApiOperation(value = "获取文章所有评论")
    @GetMapping("/getCommentsByBlogId")
    public Result<Object> getCommentsByBlogId(Integer id) {
        try {
            List<Comment> comments = commentService.getCommentsByBlogId(id);
            return Result.ok().data(comments).message("获取文章评论成功");
        } catch (Exception e) {
            return Result.fail().message("获取文章评论失败: " + e.getMessage());
        }
    }

    @ApiOperation(value = "添加评论")
    @PostMapping("/addComment")
    public Result<Object> addComment(@RequestBody JSONObject json) {
        try {
            System.out.println("addComment");
            Comment comment = JSON.toJavaObject(json.getJSONObject("comment") , Comment.class);

            Integer userId = Tool.tokenToId();
            Integer blogId = json.getInteger("id");
            comment.setId(null);

            System.out.println(userId);
            System.out.println(blogId);
            comment.setUserId(userId);
            comment.setBlogId(blogId);
            System.out.println(comment);
            Comment result = commentService.addComment(comment);
            if (result!=null) {
                return Result.ok().message("评论添加成功").data(result);
            } else {
                return Result.fail().message("评论添加失败，请稍后重试").data(false);
            }
        } catch (Exception e) {
            return Result.fail().message("评论添加失败: " + e.getMessage()).data(false);
        }
    }
    @ApiOperation(value = "查询评论者id")
    @GetMapping("/getUserIdByCommentId")
    public Result<Object> getUserIdByCommentId(Integer id) {
        try{
            User user = commentService.getUserIdByCommentId(id);
            if (user!=null) {
                return Result.ok().message("查询成功").data(user);
            } else {
                return Result.fail().message("查询失败，该评论不存在").data(false);
            }
        }catch (Exception e) {
            return Result.fail().message("查询失败: " + e.getMessage()).data(false);
        }
    }
//    @ApiOperation(value = "删除评论")
//    @GetMapping("/deleteComment")
//    public Result<Object> deleteComment(Integer commentId) {
//        try {
//            Integer userId = Tool.tokenToId();
//            boolean deleted = commentService.deleteComment(userId, commentId);
//            if (deleted) {
//                return Result.ok().message("评论删除成功").data(true);
//            } else {
//                return Result.fail().message("评论删除失败，可能无权限或评论不存在").data(false);
//            }
//        } catch (Exception e) {
//            return Result.fail().message("评论删除失败: " + e.getMessage()).data(false);
//        }
//    }
}
