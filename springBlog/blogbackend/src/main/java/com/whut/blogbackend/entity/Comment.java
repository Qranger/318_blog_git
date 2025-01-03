package com.whut.blogbackend.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName(value = "comments")
public class Comment {
    @TableId(value="id",type= IdType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer blogId;
    private String content;
    private Timestamp time;
    private Integer parentId;

    @TableLogic
    private Integer is_deleted;

    @TableField(exist = false) // 不映射到数据库表字段
    private Integer uid;
}
