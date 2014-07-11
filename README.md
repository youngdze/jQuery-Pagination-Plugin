jQuery 分页插件
===

用法：
---

```javascript
$(selector).pagination({
  totalPage: 50,
  callback: function(){
    $('.current-page').text(parseInt(location.hash.substring(6), 10)
  }
});
```

.pagination() 可以自行配置两个地方，一个是总页数，默认为 20，一个是回调函数，在点击页码事件发生后回调的函数，默认为 NULL。

当前页面由 location.hash 控制，location.hash 为空时当前页面为 1。