var express = require('express');
var router = express.Router();
var api = require('../lib/api');

//Utility modules for each route 
var models = require('../lib/utils/models.js');
var services = require('../lib/utils/services.js');
var reviews = require('../lib/utils/reviews.js');
var handleError = require('../lib/utils/error-handler.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get('/models', function(req, res, next) {
	// use api to get models and render output
	api.fetchModels().then(function(data){
		var sortedModels = models.getSortedData(data,req);
		res.render('models',{models:sortedModels});
	}).catch(function(error){
		handleError(error,res);
	});
	
});

/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get('/services', function(req, res, next) {
	// use api to get services and render output
	api.fetchServices().then(function(data){
		var filteredServices = services.getFilteredData(data,req);
		res.render('services',{services:filteredServices});
	}).catch(function(error){
		handleError(error,res);
	});
});

/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/

/*Fix: Merged customer and corporate reviews array using 
* Array.prototype.reduce function.
*/
router.get('/reviews', function(req, res, next) {
	return Promise.all([api.fetchCustomerReviews(), api.fetchCorporateReviews()])
		.then(function(data) {
			var searchedReviews = reviews.getSearchedData(data,req);
			var searchKey = reviews.getSearchKey(req);
			res.render('reviews', {reviews: searchedReviews,searchKey: searchKey});
		}).catch(function(error){
			handleError(error,res);
		});
});

module.exports = router;
