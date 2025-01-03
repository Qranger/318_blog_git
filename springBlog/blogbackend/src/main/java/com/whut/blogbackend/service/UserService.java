package com.whut.blogbackend.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.whut.blogbackend.mapper.UserMapper;
import com.whut.blogbackend.entity.User;
import java.util.List;
import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public User doLogin(String username, String password){
        QueryWrapper<User> qw = new QueryWrapper<>();
        qw.eq("name", username);
        qw.eq("password", password);
        User user = userMapper.selectOne(qw);
        System.out.println(user);
        return user;
    }

    public boolean doRegister(User user){
        boolean type = false;
        if(user!=null){
            QueryWrapper<User> qw = new QueryWrapper<>();
            qw.eq("name", user.getName());
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

    public boolean changePassword(Integer id, String oldPassword, String newPassword) {
        User user =  userMapper.selectById(id);
        if(Objects.equals(user.getPassword(), oldPassword)){
            user.setPassword(newPassword);
            System.out.println(user);
            userMapper.updateById(user);
            return true;
        }
        return false;
    }

    public boolean updateInfo(Integer id, String username, String avatar) {
        User user =  userMapper.selectById(id);
        if(user!=null){
            user.setName(username);
            user.setAvatar(avatar);
            userMapper.updateById(user);
            return true;
        }
        return false;
    }
}
