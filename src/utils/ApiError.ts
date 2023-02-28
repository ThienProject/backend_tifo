class ApiError extends Error{
  statusCode: number;
  constructor(statusCode: number, message: string, stack?: string) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      console.log('banasd');
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;