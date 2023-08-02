const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const notesRouter = require('./routes/notes');
const { readDatabaseFile, populateDatabaseFile } = require('./helpers/database-helper');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page

  res.status(err.status || 500).send(err.message);
});

// How to we start listening to the server
const port = process.env.APP_PORT || 8080;

app.listen(port, async (req, res, next) => {
  const database = await readDatabaseFile();
  if (database.length === 0) {
    populateDatabaseFile()
    console.log('The database json file has been populated with data.');
  } else {
    console.log('Database json file already contains data.');
  }
  console.log(`Server started on port ${port}`)
});