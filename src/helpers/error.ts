const errorMap: Map<number, string> = new Map([
  [1000, 'Internal Server Error'],
]);

export default class ResponseError {
  public static badRequest(code: number) {
    return new ResponseError(code, 400);
  }

  public static unauthorized(code: number) {
    return new ResponseError(code, 401);
  }

  public static notFound(code: number) {
    return new ResponseError(code, 404);
  }

  public static internal(code: number) {
    return new ResponseError(code, 500);
  }

  public status: number;
  public code: number;
  public message: string;
  constructor(errorCode: number, statusCode: number = 500) {
    this.status = statusCode;
    this.code = errorCode;
    this.message = errorMap.get(errorCode) || 'Internal Server Error';
  }
}
