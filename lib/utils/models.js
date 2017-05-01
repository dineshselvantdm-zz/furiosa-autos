var builder = require('./builder.js');

module.exports	= (function(){

	const sortOptions = ['none','asc','desc'];

	var comparatorAsc =	function(a,b) {
  		return a > b;
	}

	var comparatorDesc = function(a,b){
		return a < b;
	}

	var sortAsc = function(arr){
 		return arr.sort(comparatorAsc);
	}

	var sortDesc = function(arr){
 		return arr.sort(comparatorDesc);
	}

	//Provide sorted data based on sort option selected.
	var generateSortedData = function(arr,sortType){
		if(sortType === sortOptions[1]){
			return sortAsc(arr);
		}
		else if(sortType === sortOptions[2]){
			return sortDesc(arr)
		}
		else{
			return arr;
		}
	}

	var getSortedData = function(arr,req){		
		var sortType = req.query.sort || sortOptions[0];
		var sortedArray = generateSortedData(arr,sortType);
		//Returns sorted array and additional data required for building HTML
		return builder.appendOptionsForBuildingFormHTML(sortedArray,sortOptions,sortType);
	}

	return{
		getSortedData  : getSortedData 
	}

})();