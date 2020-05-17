var mocha = require('mocha');
var should = require('should');
var books = require('../lib/google-books-search.js');

describe('Search', function() {

    it('should return a JSON object of books', function(done) {
        books.search('Guinness World Records', {}).then(function({results}) {
            results.should.be.an.instanceof(Array)
            results[0].should.have.property('title');
            done();
        });
    });

    it('the options argument should be optional', function(done) {
        books.search('Guinness World Records').then(function({results}) {
            results.should.be.an.instanceof(Array)
            results[0].should.have.property('title');
            done();
        });
    });

    it('should return an empty array if there are no results', function(done) {
        books.search('JCEhrrpxF2E1s7aPW8zd2903tQ4AlCB9', {}).then(function({results}) {
            results.should.be.an.instanceof(Array)
            results.length.should.equal(0);
            done();
        });
    });

    it('should return a specified number of results', function(done) {
        books.search('Guinness World Records', {
            limit: 15
        }).then(function({results}) {
            results.length.should.equal(15);
            done();
        });
    });

    it('should only accept an limit below 40', function(done) {
        books.search('Guinness World Records', {
            limit: 50
        }).then(function({results}) {
            throw new Error("Limit > 40")
            done();
        }).catch(function(error) {
            should.exist(error);
            done();
        });
    });

    it('should return an error if no query is specified', function(done) {
        books.search(null, {}).then(function({results}) {
            should.not.exist(results);
            done();
        }).catch(function(error) {
            should.exist(error);
            done();
        });
    });

    it('should return the full API response body', function(done) {
        books.search('Javascript', {}).then(function({results, response}) {
            should.exist(response);
            should.equal(response.kind, 'books#volumes');
            should.exist(response.items);
            done();
        });
    });

});


describe('Lookup', function() {

    it('should return a JSON object of a volume', function(done) {
        books.lookup('9KJJYFIss_wC').then(function({result}) {
            result.should.be.an.instanceof(Object);
            result.id.should.equal('9KJJYFIss_wC');
            result.should.have.property('title');
            done();
        });
    });

    it('should return an error if an invalid volume id is provided', function(done) {
        books.lookup('this is not a real volume id').then(function({result}) {
            should.not.exist(result);
            done();
        }).catch(function(error) {
            should.exist(error);
            done();
        });
    });

});
