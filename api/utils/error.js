export const errorHandler = (statusCode, message) => {
	console.log("Called");
	const error = new Error();
	error.statusCode = statusCode;
	error.message = message;
	return error;
};
