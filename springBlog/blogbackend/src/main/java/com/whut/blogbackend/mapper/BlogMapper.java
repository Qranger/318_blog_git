package com.whut.blogbackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.whut.blogbackend.entity.Blog;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BlogMapper extends BaseMapper<Blog> {
}
