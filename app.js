import express from "express";
const app = express();
const port = 4000;
const router = express.Router();

//cors
import cors from "cors";
app.use(cors());

//swagger
import swagger from "./swagger.js";

app.use(
	"/api-docs",
	swagger.swaggerUi.serve,
	swagger.swaggerUi.setup(swagger.specs, { explorer: true })
);

//추가해야 x-www-form형태로 전송가능
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

//mysql
import mysql from "mysql";
const connection = mysql.createConnection({
	host: "34.64.214.154",
	port: "3306",
	user: "news",
	password: "12345678",
	database: "newsDB",
});

connection.connect();
//데이터

app.get("/news/economy", (req, res) => {
	connection.query(
		"select * from economyDB",
		function (error, results, fields) {
			if (error) throw error;
			res.json(results);
		}
	);
});

app.get("/news/living", (req, res) => {
	connection.query(
		"select * from livingDB",
		function (error, results, fields) {
			if (error) throw error;
			res.json(results);
		}
	);
});

/* GET sign in page. */
/**
 * @swagger
 * paths:
 *  /news/economy:
 *   get:
 *     tags: [GET NEWS DATA]
 *     summary: 전체 economy 데이터조회
 *     responses:
 *       "200":
 *         discription: 조회성공
 *         contnet:
 *           application:json
 *
 *  /news/economy/{id}:
 *   get:
 *     tags: [GET NEWS DATA by id]
 *     summary: id로 데이터 조회하기
 *     parameters:
 *       - name: id
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         discription: 조회성공
 *         content:
 *           applicaion:json

 */

app.get("/news/economy/:id", (req, res) => {
	connection.query(
		"select * from economyDB",
		function (error, results, fields) {
			if (error) throw error;
			let { id } = req.params;
			let count = id - 1;
			let resultId = results[count].id;

			if (id == resultId) {
				res.json(results[count]);
			} else {
				res.send("wrong id");
			}
		}
	);
});

app.get("/news/living/:id", (req, res) => {
	connection.query(
		"select * from livingDB",
		function (error, results, fields) {
			if (error) throw error;
			let { id } = req.params;
			let count = id - 1;
			let resultId = results[count].id;

			if (id == resultId) {
				res.json(results[count]);
			} else {
				res.send("wrong id");
			}
		}
	);
});

app.delete("/news/:num", (req, res) => {
	connection.query(
		`delete from economyDB where id=?`,
		[req.params.num],
		function (error, results, fields) {
			if (error) throw error;
			const { num } = req.params;

			res.send("데이터를 삭제하였습니다");
		}
	);
});

app.listen(port);
