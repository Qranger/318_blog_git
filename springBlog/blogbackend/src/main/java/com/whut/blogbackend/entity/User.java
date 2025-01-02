package com.whut.blogbackend.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

import java.util.List;


@Data
public class User {
    private Integer id;
    private String username;
    private String password;
    private String avatar;



    @TableLogic
    private Integer deleted;

    @TableField(exist = false) // 不映射到数据库表字段
    private List<Article> articles;

    public void mark(){
        this.password=null;
    }
}
