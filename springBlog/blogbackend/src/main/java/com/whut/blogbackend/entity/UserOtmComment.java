package com.whut.blogbackend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import lombok.Data;

@Data
public class UserOtmComment {
    @TableId(value="id",type= IdType.AUTO)
    private Integer id;
    private Integer uid;
    private Integer cid;

    @TableLogic
    private Integer deleted;
}