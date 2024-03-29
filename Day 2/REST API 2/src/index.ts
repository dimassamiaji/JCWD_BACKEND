import express, { Request, Response, Application, NextFunction } from "express";
import { routes } from "./routes";
import { writeLog } from "./middlewares/write-log";

const PORT = 8001;
const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("hello");
  next();
});

app.use(writeLog);

app.get("/", (req: Request, res: Response) => {
  //   throw Error("ini error");
  res.send("welcome to api");
});

// req,res , (next) => request handler
// error ,req,res,(next) => error handler

//user routes
app.use("/users", routes.userRoutes);
app.use("/products", routes.productRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).send("something broke");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () => {
  console.log("berjalan di port", PORT);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("test");
});
