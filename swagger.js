import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const options = {
	swaggerDefinition: {
		openapi: "3.0.3",
		info: {
			title: "Test API",
			version: "1.0.0",
			description: "Test API with express",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["/routes/*.js", "./swagger/*", "./models/*.js", "./app.js"],
};

const specs = swaggerJsdoc(options);
export default {
	swaggerUi,
	specs,
};

// module.exports = {
// 	swaggerUi,
// 	specs,
//  apis 이부분에 명세경로 꼭 추가하기
//  import 문은 최신 require이 예전문법  - import문법 공부하면 좋다
//  명세는 get요청 이후로 해주기
//  router 설정해주기 - get or host모두 router로
