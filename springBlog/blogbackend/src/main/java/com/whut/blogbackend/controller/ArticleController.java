//package com.whut.blogbackend.controller;
//
//import cn.dev33.satoken.stp.StpUtil;
//import io.swagger.annotations.ApiOperation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import com.whut.blogbackend.service.ArticleService;
//import com.whut.blogbackend.entity.Result;
//import com.whut.blogbackend.entity.Article;
//import java.util.List;
//
//@RestController
//
//@RequestMapping("/article")
//public class ArticleController {
//    @Autowired
//    private ArticleService articleService;
//
//
//    @ApiOperation(value = "获取文章详情")
//    @GetMapping("/getArticle")
//    public Result<Object> getArticle(Integer articleId) {
//        try {
//            Integer uid = StpUtil.getLoginIdAsInt();
//
//            Article article = articleService.getArticle(articleId);
//            if (article != null) {
//                return Result.ok().data(article).message("获取文章详情成功");
//            } else {
//                return Result.fail().message("获取文章详情失败，文章不存在");
//            }
//        } catch (Exception e) {
//            return Result.fail().message("获取文章详情失败: " + e.getMessage());
//        }
//    }
//
//    @ApiOperation(value = "添加文章")
//    @PostMapping("/addArticle")
//    public Result<Object> addArticle(@RequestBody Article article) {
//        try {
//            Integer uid = StpUtil.getLoginIdAsInt();
//
//            article.setId(null);
//            boolean added = articleService.addArticle(uid, article);
//            if (added) {
//                return Result.ok().message("添加文章成功").data(true);
//            } else {
//                return Result.fail().message("添加文章失败，请稍后重试").data(false);
//            }
//        } catch (Exception e) {
//            return Result.fail().message("添加文章失败: " + e.getMessage()).data(false);
//        }
//    }
//
//    @ApiOperation(value = "删除文章")
//    @GetMapping("/deleteArticle")
//    public Result<Object> deleteArticle(Integer articleId) {
//        try {
//            Integer uid = StpUtil.getLoginIdAsInt();
//
//            articleService.deleteArticledynamic(articleId);
//            boolean deleted = articleService.deleteArticle(uid, articleId);
//            if (deleted) {
//                return Result.ok().message("删除文章成功").data(true);
//            } else {
//                return Result.fail().message("删除文章失败，可能无权限或文章不存在").data(false);
//            }
//        } catch (Exception e) {
//            return Result.fail().message("删除文章失败: " + e.getMessage()).data(false);
//        }
//    }
//
//    @ApiOperation(value = "更新文章")
//    @PostMapping("/updateArticle")
//    public Result<Object> updateArticle(@RequestBody Article article) {
//        try {
//            Integer uid = StpUtil.getLoginIdAsInt();
//
//            boolean updated = articleService.updateArticle(uid, article);
//            if (updated) {
//                return Result.ok().message("更新文章成功").data(true);
//            } else {
//                return Result.fail().message("更新文章失败，请稍后重试").data(false);
//            }
//        } catch (Exception e) {
//            return Result.fail().message("更新文章失败: " + e.getMessage()).data(false);
//        }
//    }
//
//    @ApiOperation(value = "获取用户所有摘要文章")
//    @GetMapping("/getUserAllSummaryArticles")
//    public Result<Object> getUserAllSummaryArticles(Integer uid) {
//        try {
//            List<Article> articleList = articleService.getUserWithArticles(uid);
//            articleList.forEach(Article::showSummaryMark);
//            return Result.ok().data(articleList).message("获取用户所有摘要文章成功");
//        } catch (Exception e) {
//            return Result.fail().message("获取用户所有摘要文章失败: " + e.getMessage());
//        }
//    }
//    @ApiOperation(value = "获取所有文章摘要")
//    @GetMapping("/getAllSummaryArticles")
//    public Result<Object> getAllSummaryArticles() {
//        try {
//            List<Article> articleList = articleService.getAllArticles();
//            articleList.forEach(Article::showSummaryMark);
//            return Result.ok().data(articleList).message("获取所有摘要文章成功");
//        } catch (Exception e) {
//            return Result.fail().message("获取所有摘要文章失败: " + e.getMessage());
//        }
//    }
//    @ApiOperation(value = "搜索文章")
//    @GetMapping("/searchArticle")
//    public Result<Object> searchArticle(String search) {
//        try {
//            List<Article> articleList = articleService.getSearchArticle(search);
//            articleList.forEach(Article::showSummaryMark);
//            return Result.ok().data(articleList).message("搜索文章成功");
//        } catch (Exception e) {
//            return Result.fail().message("搜索文章失败: " + e.getMessage());
//        }
//    }
//    @ApiOperation(value = "文章鉴权")
//    @GetMapping("/certifyUser")
//    public Result<Object> certify(Integer articleId) {
//        try {
//            Integer uid = StpUtil.getLoginIdAsInt();
//            if(articleService.certifyArticle(uid, articleId)){
//                return Result.ok().message("该用户有权限").data(true);
//            }
//            else
//                return Result.fail().message("该用户无权限").data(false);
//        }catch (Exception e) {
//            return Result.fail().message("获取权限失败: " + e.getMessage()).data(false);
//        }
//    }
//
//    @GetMapping("/getUserByArticleId")
//    public Result<Object> getUserByArticleId(Integer articleId){
//        System.out.println("getUserByArticleId" + articleId);
//        Integer uid = articleService.getUidByArticleId(articleId);
//        if(uid!=null){
//            return Result.ok().message("获取uid成功").data(uid);
//        }
//        else
//            return Result.fail().message("获取uid失败").data(uid);
//    }
//}
