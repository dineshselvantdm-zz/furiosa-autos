//Error handler for routes
module.exports = function(err,res){
	res.status(err.status || 500);
	//Log error in file using any logger like Bunyan or Winston
	console.log(err);

	/*Dont show the error for users in production or staging
	 *Enable after configuring ENV variable
	*/
	// if (process.env !== 'development') {    
	//     err={};
	// }

	//Render error template
	res.render('error', {
      message: err.message,
      error: err
    });
}