import createError from "http-errors"
import express, { json, urlencoded, static as expressStatic } from "express"
import { join } from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import * as url from "node:url"
import indexRouter from "./routes/index.js"
import usersRouter from "./routes/users.js"

var app = express()

// view engine setup
app.set(
  "views",
  join(url.fileURLToPath(new URL(".", import.meta.url)), "views"),
)
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  expressStatic(
    join(url.fileURLToPath(new URL(".", import.meta.url)), "public"),
  ),
)

app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

export default app
