package com.whut.blogbackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.whut.blogbackend.entity.Blog;
import com.whut.blogbackend.entity.User;
import com.whut.blogbackend.mapper.BlogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BlogService {
    @Autowired
    private BlogMapper blogMapper;

    @Autowired
    private UserService userService;



    public Blog getBlog(Integer id) {
        return blogMapper.selectById(id);
    }

    public List<Blog> getAllBlogs() {
        QueryWrapper<Blog> qw = new QueryWrapper<>();
        return blogMapper.selectList(qw);
    }

    public List<Blog> getUserWithBlogs(Integer uid) {
        System.out.println(uid);
        // 查询用户信息
        User user = userService.getUser(uid);
        if (user != null) {
            // 查询用户关联的文章信息
            QueryWrapper<Blog> aqw=new QueryWrapper<>();
            aqw.eq("user_id", uid);
            return blogMapper.selectList(aqw);
        }

        return null;
    }

    public  boolean certifyBlog(Integer uid, Integer id){
        List<Blog> blogList = this.getUserWithBlogs(uid);
        if(blogList !=null){
            for(Blog blog : blogList){
                if (Objects.equals(blog.getId(), id)){
                    return true;
                }
            }
        }
        return false;
    }

    public boolean updateArticle(Integer uid, Blog blog) {
        if(certifyBlog(uid, blog.getId())){
            blogMapper.updateById(blog);
            return true;
        }
        else{
            return false;
        }
    }

    public boolean addBlog(Integer uid, Blog blog) {

        if(blog !=null){
            blog.setUserId(uid);
            blogMapper.insert(blog);
            return true;
        } else{
            return false;
        }
    }

    public boolean deleteBlog(Integer uid,Integer id) {
        if(certifyBlog(uid, id)){
            blogMapper.deleteById(id);
            return true;
        }else{
            return false;
        }
    }

    public List<Blog> getSearchBlog(String search) {
        QueryWrapper<Blog> qw = new QueryWrapper<>();
        qw.like("title", search);
        List<Blog> blogList = blogMapper.selectList(qw);
        System.out.println("searchArticle:"+ blogList);
        return blogList;
    }


    public Integer getUidByBlogId(Integer id){
        QueryWrapper<Blog> qw = new QueryWrapper<>();
        return blogMapper.selectById(id).getUserId();
    }
}
