package com.whut.blogbackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.whut.blogbackend.mapper.UserMapper;
import com.whut.blogbackend.entity.User;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User doLogin(String username, String password){
        QueryWrapper<User> qw = new QueryWrapper<>();
        qw.eq("username", username);
        qw.eq("password", password);
        User user = userMapper.selectOne(qw);
        System.out.println(user);
        return user;
    }

    public boolean doRegister(User user){
        boolean type = false;
        if(user!=null){
            QueryWrapper<User> qw = new QueryWrapper<>();
            qw.eq("username", user.getUsername());
            if(userMapper.selectOne(qw) != null){
                return type;
            }
            if(userMapper.insert(user)>0){
                type = true;
            }
        }
        return type;
    }
    public List<User> getAllUser(){
        QueryWrapper<User> qw = new QueryWrapper<>();
        return userMapper.selectList(qw);
    }
    public User getUser(Integer uid) {

        User user =  userMapper.selectById(uid);
        user.mark();
        return user;
    }

    public boolean deleteUser(Integer uid) {
        try{
            userMapper.deleteById(uid);
            return true;
        } catch(Exception e){
            return false;
        }
    }

    public boolean changePassword(String username, String oldPassword, String newPassword) {
        User user = doLogin(username , oldPassword);
        if(user!=null){
            user.setPassword(newPassword);
            userMapper.updateById(user);
            return true;
        }
        return false;
    }
}
