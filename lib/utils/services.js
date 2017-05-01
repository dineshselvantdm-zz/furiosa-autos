var builder = require('./builder.js');

module.exports	= (function(){

	const filterOptions = ['none','repair','maintenance','cosmetic'];

	var generateFilteredData = function(arr,filterType){		
		if(filterOptions.indexOf(filterType)<=-1||filterType === filterOptions[0]){
			return arr;
		}
		//Filter function to provide the array of results that matches chosen type.
		return arr.filter(function(service){
			return service.type === filterType;
		})
	}

	var getFilteredData = function(arr,req){
		var filterType = req.query.filter||filterOptions[0];	
		var filteredArray = generateFilteredData(arr,filterType);
		//Returns filtered array and additional data required for building HTML
		return builder.appendOptionsForBuildingFormHTML(filteredArray,filterOptions,filterType);
	}

	return{
		getFilteredData  : getFilteredData 
	}

})();