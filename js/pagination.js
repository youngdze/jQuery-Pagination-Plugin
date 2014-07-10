// generate pagination quene
var Pagination = function(total, currentPage) {

    this.total = total;
    this.currentPage = currentPage;

    this.generate = function() {

        try {

            // validate if both are positive integers
            function isInteger(data) {
                var exgInt = /^\+?(0|[1-9])\d*$/;
                return exgInt.test(data);
            }

            if (!(isInteger(this.total) || isInteger(this.currentPage))) {
                throw 'positive integers required';
            }

            if (this.currentPage > this.total) {
                throw 'current index of page cannot bigger than the total number of pages';
            }

            var pageButton = [];

            // The first situation
            if (this.currentPage < 6) {
                for (var i = 1; i <= this.total; i++) {
                    if (i <= (this.currentPage + 2)) {
                        pageButton.push(i);
                    } else if (Math.abs(((this.currentPage + 2) - this.total)) < 2) {
                        pageButton.push(i);
                        if (i === this.total) {
                            break;
                        }
                    } else if (i === this.total) {
                        pageButton.push('...');
                        pageButton.push(this.total);
                    } else {
                        continue;
                    }
                }
            }

            // The second situation
            else if (this.currentPage >= 6 && this.currentPage <= (this.total - 5)) {
                for (var i = 1; i <= this.total; i++) {
                    if (i === 1) {
                        pageButton.push(1);
                        pageButton.push('...');
                    } else if (i < (this.currentPage - 2)) {
                        continue;
                    } else if (i >= (this.currentPage - 2) && i <= (this.currentPage + 2)) {
                        pageButton.push(i);
                    } else if (i > (this.currentPage + 2) && i < this.total) {
                        continue;
                    } else if (i === this.total) {
                        pageButton.push('...');
                        pageButton.push(i);
                    }
                }
            }

            // The third situation
            else if (this.currentPage > (this.total - 5)) {
                for (var i = 1; i <= this.total; i++) {
                    if (i === 1) {
                        pageButton.push(1);
                        pageButton.push('...');
                    } else if (i < (this.currentPage - 2)) {
                        continue;
                    } else {
                        pageButton.push(i);
                    }
                }
            }

            if (this.currentPage === 1) {
                pageButton.push('next');
            } else if (this.currentPage === this.total) {
                pageButton.splice(0, 0, 'pre');
            } else {
                pageButton.splice(0, 0, 'pre');
                pageButton.push('next');
            }

            return pageButton;

        } catch (err) {
            console.log('Error: ' + err + ".");
        }
    };
}

// generate normal element
var Element = function(nodeName, text) {

    this.nodeName = nodeName;
    this.text = text;

    this.generate = function() {

        var newElement = document.createElement(this.nodeName);
        var newContent = document.createTextNode(this.text);
        newElement.appendChild(newContent);

        return newElement;
    }
}

var renderPage = function(totalPage, currentPage) {

    var hash = parseInt(location.hash.substring(6), 10);

    var page = new Pagination(totalPage, currentPage);
    var pageQuene = page.generate();

    var ul_element = new Element('ul', '');
    var ul = ul_element.generate();
    ul.setAttribute('class', 'pagination');

    for (var i = 0; i < pageQuene.length; i++) {
        var li_element = new Element('li', '');
        var a_element = new Element('a', pageQuene[i]);
        var li = li_element.generate();
        var a = a_element.generate();

        if (pageQuene[i] === 'pre' || pageQuene[i] === 'next' || pageQuene[i] === '...') {
            a.setAttribute('href', 'javascript:void(0)');

            if (pageQuene[i] === 'pre') {
                li.setAttribute('class', 'pagePre');
            } else if (pageQuene[i] === 'next') {
                li.setAttribute('class', 'pageNext');
            } else {
                a.setAttribute('style', 'cursor: not-allowed;');
            }

        } else {
            a.setAttribute('href', '#page=' + pageQuene[i]);
        }

        if (!hash && pageQuene[i] == 1) {
            li.setAttribute('class', 'active');
        } else if (pageQuene[i] === hash) {
            li.setAttribute('class', 'active');
        }

        li.appendChild(a);
        ul.appendChild(li);
    }

    return ul;
}

$(window).load(function() {
    var pageNow = parseInt(location.hash.substring(6), 10) ? parseInt(location.hash.substring(6), 10) : 1;
    $('.pagewrapper').html(renderPage(20, pageNow));
    $('.pagination').find('li').click(function(e) {
        if ($(this).hasClass('pagePre')) {
            window.location = window.location.pathname + "#page=" + (--pageNow);
            location.reload();
        } else if ($(this).hasClass('pageNext')) {
            window.location = window.location.pathname + "#page=" + (++pageNow);
            location.reload();
        } else if ($(this).text() === '...') {

        } else {
            window.location = window.location.pathname + "#page=" + parseInt($(this).find('a').attr('href').substring(6), 10);
            location.reload();
        }
    });
});