package com.whut.blogbackend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.whut.blogbackend.entity.Article;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ArticleMapper extends BaseMapper<Article> {
}
