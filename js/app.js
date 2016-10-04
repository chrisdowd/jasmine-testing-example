/*
This file downloads the RSS feeds and runs a series of tests on them.
*/
var allFeeds = [{
    name: 'CSS Tricks',
    url: 'http://css-tricks.com/feed'
}, {
    name: 'HTML5 Rocks',
    url: 'http://feeds.feedburner.com/html5rocks'
}, {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

function init() {
    loadFeed(0);
}

// Tests to ensure the feeds are defined and load properly
function loadFeed(id, cb) {
    var feedUrl = allFeeds[id].url,
        feedName = allFeeds[id].name,
        feed = new google.feeds.Feed(feedUrl);
    feed.load(function(result) {
        if (!result.error) {
            var container = $('.feed'),
                title = $('.header-title'),
                entries = result.feed.entries,
                entriesLen = entries.length,
                entryTemplate = Handlebars.compile($('.tpl-entry').html());
            title.html(feedName);
            container.empty();
            entries.forEach(function(entry) {
                container.append(entryTemplate(entry));
            });
        }
        if (cb) {
            cb();
        }
    });
}

google.load('feeds', '1');
google.setOnLoadCallback(init);

// Tests to ensure that the feeds can change and that the menu works
$(function() {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');
    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));
        feedId++;
    });
    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });
    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });
}());