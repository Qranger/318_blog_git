package com.whut.blogbackend.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.whut.blogbackend.entity.User;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.whut.blogbackend.service.BlogService;
import com.whut.blogbackend.entity.Result;
import com.whut.blogbackend.entity.Blog;
import java.util.List;

@RestController

@RequestMapping("/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;


    @ApiOperation(value = "获取文章详情")
    @GetMapping("/getBlogById")
    public Result<Object> getBlog(Integer id) {
        try {
            Blog blog = blogService.getBlog(id);
            if (blog != null) {
                return Result.ok().data(blog).message("获取文章详情成功");
            } else {
                return Result.fail().message("获取文章详情失败，文章不存在");
            }
        } catch (Exception e) {
            return Result.fail().message("获取文章详情失败: " + e.getMessage());
        }
    }

    @ApiOperation(value = "添加文章")
    @PostMapping("/addBlog")
    public Result<Object> addBlog(@RequestBody Blog blog) {
        try {
            Integer uid = StpUtil.getLoginIdAsInt();

            blog.setId(null);
            boolean added = blogService.addBlog(uid, blog);
            if (added) {
                return Result.ok().message("添加文章成功").data(true);
            } else {
                return Result.fail().message("添加文章失败，请稍后重试").data(false);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Result.fail().message("添加文章失败: " + e.getMessage()).data(false);
        }
    }

    @ApiOperation(value = "删除文章")
    @DeleteMapping("/deleteBlog")
    public Result<Object> deleteBlog(Integer id) {
        try {
            Integer uid = StpUtil.getLoginIdAsInt();
            boolean deleted = blogService.deleteBlog(uid, id);
            if (deleted) {
                return Result.ok().message("删除文章成功").data(true);
            } else {
                return Result.fail().message("删除文章失败，可能无权限或文章不存在").data(false);
            }
        } catch (Exception e) {
            return Result.fail().message("删除文章失败: " + e.getMessage()).data(false);
        }
    }

    @ApiOperation(value = "更新文章")
    @PostMapping("/updateBlog")
    public Result<Object> updateBlog(@RequestBody Blog blog) {
        try {
            Integer uid = StpUtil.getLoginIdAsInt();

            boolean updated = blogService.updateArticle(uid, blog);
            if (updated) {
                return Result.ok().message("更新文章成功").data(true);
            } else {
                return Result.fail().message("更新文章失败，请稍后重试").data(false);
            }
        } catch (Exception e) {
            return Result.fail().message("更新文章失败: " + e.getMessage()).data(false);
        }
    }

    @ApiOperation(value = "获取用户所有摘要文章")
    @GetMapping("/getUserAllSummaryBlogs")
    public Result<Object> getUserAllSummaryBlogs(Integer id) {
        try {
            List<Blog> blogList = blogService.getUserWithBlogs(id);
            blogList.forEach(Blog::showSummaryMark);
            return Result.ok().data(blogList).message("获取用户所有摘要文章成功");
        } catch (Exception e) {
            return Result.fail().message("获取用户所有摘要文章失败: " + e.getMessage());
        }
    }
    @ApiOperation(value = "获取所有文章摘要")
    @GetMapping("/getAllSummaryBlogs")
    public Result<Object> getAllSummaryBlogs() {
        try {
            List<Blog> blogList = blogService.getAllBlogs();
            blogList.forEach(Blog::showSummaryMark);
            return Result.ok().data(blogList).message("获取所有摘要文章成功");
        } catch (Exception e) {
            return Result.fail().message("获取所有摘要文章失败: " + e.getMessage());
        }
    }
    @ApiOperation(value = "搜索文章")
    @GetMapping("/searchBlog")
    public Result<Object> searchBlog(String search) {
        try {
            List<Blog> blogList = blogService.getSearchBlog(search);
            blogList.forEach(Blog::showSummaryMark);
            return Result.ok().data(blogList).message("搜索文章成功");
        } catch (Exception e) {
            return Result.fail().message("搜索文章失败: " + e.getMessage());
        }
    }
    @ApiOperation(value = "文章鉴权")
    @GetMapping("/certifyUser")
    public Result<Object> certify(Integer id) {
        try {
            Integer uid = StpUtil.getLoginIdAsInt();
            if(blogService.certifyBlog(uid, id)){
                return Result.ok().message("该用户有权限").data(true);
            }
            else
                return Result.fail().message("该用户无权限").data(false);
        }catch (Exception e) {
            return Result.fail().message("获取权限失败: " + e.getMessage()).data(false);
        }
    }

    @GetMapping("/getUseridByBlogid")
    public Result<Object> getUserIdByBlogId(Integer id){
        System.out.println("getUserIdByBlogId" + id);
        Integer uid = blogService.getUidByBlogId(id);
        User user = new User();
        user.setId(uid);
        if(uid!=null){
            return Result.ok().message("获取uid成功").data(user);
        }
        else
            return Result.fail().message("获取uid失败");
    }
}
