const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
	Promise.resolve(fn(req, res, next)).catch(error => {
		console.log(error);
		next(error, req, res);
	});

export default asyncHandler;
