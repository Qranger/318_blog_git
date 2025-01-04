package com.whut.blogbackend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "blogs")
public class Blog {
    @TableId(value="id",type= IdType.AUTO)
    private Integer id;
    private Integer userId;
    private String content;
    private String title;
    private String titleImg;

    @TableLogic
    private Integer isDeleted;

    public void showSummaryMark(){
        this.content=null;
    }
}
