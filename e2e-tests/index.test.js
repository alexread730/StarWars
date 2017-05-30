module.exports = {
  'Index test' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementVisible('body', 1000)
      .assert.visible('.jumbotron')
      .end();
  },
    'Timeline test' : function (browser) {
      browser
        .url('http://localhost:8080/timeline.html')
        .waitForElementVisible('#viewport', 1000)
        .assert.hidden('.hidden');
        browser.expect.element('#search').to.not.be.enabled;
        browser.end();
    },
    'Character test' : function (browser) {
      browser
        .url('http://localhost:8080/characters.html')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('button[data-index="3"]', 2000);
    }
  };
