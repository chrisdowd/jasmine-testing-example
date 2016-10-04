$(function() {
  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    //Function to check whether or not url is entered properly
    function urlCheck(url) {
      try {
        return !!url.match("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
      } catch (error) {
        return false;
      }
    }

    // Function that ensures url field is not empty and contains an address
    it('URL defined and not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(urlCheck(feed.url)).toBe(true);
      });
    });

    function contentEmpty(string) {
      return (!string || 0 === string.length);
    }

    // Ensures that names are defined and not empty
    it('names are defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(contentEmpty(feed.name)).not.toBe(true);
      });
    });
  });

  // Test suite to examine menu functionality
  describe('The menu', function() {

    var body = $('body');
    var menu = $('.menu-icon-link');
    it('the menu is hidden', function() {
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
    // Checks to see if menu visibility changes when clicked
    it('changes visibility when clicked', function() {
      menu.trigger('click');
      expect(body.hasClass('menu-hidden')).toBe(false);
      menu.trigger('click');
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
  });

  // Test suite that checks to see that there is at least one entry in feed container
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('is not empty', function(done) {
      var exist = $('.feed').find('.entry');
      expect(exist.length > 0).toBe(true);
      done();
    });
  });

  // Functions that ensures the content changes when a new feed is loaded
  describe('New Feed Selection', function() {

    var before;
    var after;

    beforeEach(function(done) {
      expect(allFeeds.length >= 3).toBe(true);
      loadFeed(1, function() {
        before = $('.header-title').text() + $('.feed').find('.entry').text();
        loadFeed(2, function() {
          after = $('.header-title').text() + $('.feed').find('.entry').text();
          done();
        });
      });
    });

    it('change exists', function(done) {
      expect(before != after).toBe(true);
      done();
    });
  });
}());