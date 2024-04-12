import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import router from "../routes";

dotenv.config();

const app = express();
/*
    Configurations
*/

app.use(
	cors({
		origin: "*",
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.get("/", (_req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"POST, GET, PUT, DELETE, PATCH"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);
	next();
});

// Setup swagger
const options = {
	swaggerDefinition: {
		info: {
			title: "URL Shortener Service",
			version: "1.0.0",
			description: "A service for shortening URLs",
		},
		basePath: "/",
	},
	apis: ["./swagger.yaml"], // Path to your API files
};
const specs = swaggerJsdoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// Use the router to handle incoming requests
app.use("/", router);

/** Enable this for local testing on your local environment
 *  Uncomment the code below for running on node server
 */

// const port = process.env.PORT || 5000;
// app.listen(port, function () {
// 	console.log(`Server Started: http://localhost:${port}/`);
// });

/*
Exporting the express app is for serverless deploy on Vercel
Enable the part above for deployment on AWS, GCC or Azure or any other node environment
*/
export default app;
