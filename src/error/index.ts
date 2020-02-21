type errorGroup =
	"token" |
	"tokenExpire" |
	"permission" |
	"params" |
	"account" |
	"system" |
	"systemDB" |
	"success"

export class ErrorResponse extends Error {
	code: number;

	constructor(message: string, code: number) {
		super(message);
		this.code = code;
		this.name = "apiError";
	}
}

interface SuccessResponse {
	code: number,
	message: string
}

type IApiResponse = Record<errorGroup, ErrorResponse | SuccessResponse>

export const ApiResponse: IApiResponse = {
	success: {code: 1000, message: "success"},
	system: new ErrorResponse("system error", 2000),
	systemDB: new ErrorResponse("system error", 2001),
	token: new ErrorResponse("token not found", 3000),
	tokenExpire: new ErrorResponse("token expire", 3001),
	permission: new ErrorResponse("permission deny", 4000),
	params: new ErrorResponse("params error", 5000),
	account: new ErrorResponse("account error", 6000)
};
