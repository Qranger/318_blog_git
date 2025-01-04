package com.whut.blogbackend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.List;


@Data
@TableName(value = "users")
public class User {
    private Integer id;
    private String name;
    private String password;
    private String avatar;



    @TableLogic
    private Integer isDeleted;

    @TableField(exist = false) // 不映射到数据库表字段
    private List<Blog> blogs;

    @TableField(exist = false)
    private String token;

    public void mark(){
        this.password=null;
    }
}
