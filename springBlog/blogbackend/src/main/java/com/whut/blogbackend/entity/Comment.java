package com.whut.blogbackend.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName(value = "comments")
public class Comment {
    @TableId(value="id",type= IdType.AUTO)
    private Integer id;
    private String context;
    private Timestamp time;
    private Integer parentId;
    private Integer responseId;

    @TableLogic
    private Integer deleted;

    @TableField(exist = false) // 不映射到数据库表字段
    private Integer uid;
}
