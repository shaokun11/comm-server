export enum ResponseCode {
	Success = 1000,
	TokenInvalidError = 2000,
	TokenExpireError = 2001,
	PermissionError = 2002,
	ParamsError = 3000,
	UserNotFoundError = 3001,
	PwdError = 3002,
	SystemError = 4000,
	SystemDbError = 4001

}

export class ApiError extends Error {
	code: ResponseCode;

	constructor(message: string) {
		super(message);
	}
}

export class TokenExpireError extends ApiError {
	constructor(message = "Token Expire") {
		super(message);
		this.code = ResponseCode.TokenExpireError;
	}
}

export class PermissionError extends ApiError {
	constructor(message: string) {
		super(message);
		this.code = ResponseCode.PermissionError;
	}
}

export class ParamsError extends ApiError {
	constructor(message: string) {
		super(message);
		this.code = ResponseCode.ParamsError;
	}
}

export class UserNotFoundError extends ApiError {
	constructor(message = " User Not Found") {
		super(message);
		this.code = ResponseCode.UserNotFoundError;
	}
}

export class PwdError extends ApiError {
	constructor(message = "Password Error") {
		super(message);
		this.code = ResponseCode.PwdError;
	}
}
