var dataLength = 100,
    perPageLength = 5,
    pageLength = 5,
    pageNow = 1,
    hash = location.hash,
    self = $('.pagewrapper');

var lastPage = Math.ceil(dataLength / perPageLength);
pageNow = (hash == '') ? 1 : parseInt(hash.substring(1), 10);

var newElement = function() {
    var newElement = document.createElement(arguments[0]);
    var newContent = document.createTextNode(arguments[1]);
    var newAttribute = document.createAttribute('class');
    newAttribute.value = arguments[2];
    newElement.setAttributeNode(newAttribute);
    newElement.appendChild(newContent);
    return newElement;
}

var new_li = function(data) {
    var li = newElement('li', '', '');
    var a = newElement('a', data, '');
    var href = document.createAttribute('href');
    href.value = '#' + data;
    a.setAttributeNode(href);
    li.appendChild(a);
    return li;
}

var new_ul = newElement('ul', '', 'pagination');

for (var i = 1; i <= Math.ceil(dataLength / perPageLength); i++) {
    new_ul.appendChild(new_li(i));
}

self.append(new_ul);
var ul = self.find('.pagination');
var li = ul.find('li');

ul.prepend('<li><a href="javascript:void(0)" class="pagePre">&laquo;</a></li>');
ul.append('<li><a href="javascript:void(0)" class="pageNext">&raquo;</a></li>');

var pagePre = $('.pagination').find('li').first();
var pageNext = $('.pagination').find('li').last();

$(window).load(function() {
    if (pageNow == 1) {
        li.first().addClass('active').siblings().removeClass('active');
        pagePre.css('display', 'none');
    } else if (pageNow == lastPage) {
        li.last().addClass('active').siblings().removeClass('active');
        pageNext.css('display', 'none');
    } else {
        li.eq(pageNow - 1).addClass('active').siblings().removeClass('active');
    }

    if (lastPage > 5) {}
})

li.click(function(e) {
    $(this).addClass('active').siblings().removeClass('active');
    pageNow = parseInt($(this).find('a').attr('href').substring(1), 10);
    if (pageNow == 1) {
        pagePre.css('display', 'none');
    } else if (pageNow == lastPage) {
        pageNext.css('display', 'none');
    } else {
        pagePre.css('display', 'inline');
        pageNext.css('display', 'inline');
    }
});

pagePre.click(function(e) {
    pageNow -= 1;
    window.location = window.location.pathname + "#" + pageNow;

    li.eq(pageNow - 1).addClass('active').siblings().removeClass('active');
    if (pageNow == 1) {
        pagePre.css('display', 'none');
        pageNext.css('display', 'inline');
    } else if (pageNow == lastPage) {
        pagePre.css('display', 'inline');
        pageNext.css('display', 'none');
    } else {
        pagePre.css('display', 'inline');
        pageNext.css('display', 'inline');
    }
});

pageNext.click(function(e) {
    pageNow += 1;
    window.location = window.location.pathname + "#" + pageNow;

    li.eq(pageNow - 1).addClass('active').siblings().removeClass('active');
    if (pageNow == 1) {
        pagePre.css('display', 'none');
        pageNext.css('display', 'inline');
    } else if (pageNow == lastPage) {
        pagePre.css('display', 'inline');
        pageNext.css('display', 'none');
    } else {
        pagePre.css('display', 'inline');
        pageNext.css('display', 'inline');
    }
});