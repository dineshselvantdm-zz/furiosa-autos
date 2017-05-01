module.exports	= (function(){

	//Merge Customer and Corporate data in to single array.
	var mergeCustomerAndCorporateData = function(reviews){
		return reviews.reduce(function(mergedReviews,review){
			return mergedReviews.concat(review);
		});
	}
	//Convert data and search key to lower case and search for key and return true if present.
	var isSearchKeyPresent = function(mergedReview,req){
		var searchKey = getSearchKey(req).toLowerCase();
		return (mergedReview.content.toLowerCase().search(searchKey) >= 0 
				|| mergedReview.source.toLowerCase().search(searchKey) >= 0);
	}

	var generateSearchedData = function(mergedReviews,req){	
		//If no searh key from query params return all reviews
		if(getSearchKey(req) === ''){
			return mergedReviews;
		}	
		//If searh key is present in query params return filtered reviews
		var searchedReviews = mergedReviews.filter(function(mergedReview){
			return isSearchKeyPresent(mergedReview,req);
		});
		return searchedReviews;
	}

	var getSearchedData = function(reviews,req){
		var mergedReviews = mergeCustomerAndCorporateData(reviews);
		return generateSearchedData(mergedReviews,req);
	}

	var getSearchKey = function(req){
		var key = req.query.search || '';
		return key;
	}

	return{
		getSearchedData  : getSearchedData,
		getSearchKey : getSearchKey
	}

})();