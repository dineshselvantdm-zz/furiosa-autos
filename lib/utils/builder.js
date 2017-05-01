//Builder module utility for adding extra data needed for rendering views
module.exports	= (function(){

	//Options array will be merged, which is needed for dynamic rendering of HTML 
	var appendOptionsForBuildingFormHTML = function(arr,options,selectedOption){
		var appendedOptions = {
			//Original array not manipulated. optionsForHTML is only merged in new Object.
			data: arr,
			optionsForHTML: []
		};
		appendedOptions.optionsForHTML = options.map(function(option){
			//Text node for displaying options in UI dropdown
			let text = option.toUpperCase();
			//Selected attribute for select options 
			let selected = false;
			if(selectedOption && selectedOption === option)
			{
				selected = true;
			}
			let optionsForHTML = {
				value:option,
				text:text,
				selected:selected
			}
			return optionsForHTML;
		});
		return appendedOptions;
	}

	return{
		appendOptionsForBuildingFormHTML  : appendOptionsForBuildingFormHTML 
	}

})();