var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./database');
const klawSync = require('klaw-sync');
const cors = require('cors')

const { models, sequelize } = database;
const config = require('config');

const useRoutes = async () => {
  const paths = klawSync(`${__dirname}/routes`, { nodir: true });
  let routeCount = 0;

  paths.forEach((file) => {
    const [baseName] = path.basename(file.path);
    
    if (baseName === '_' || baseName === '.') return;

    app.use('/', require(file.path));
    routeCount++;
  });

  console.log('Total routes count: ', routeCount);
};

var app = express();

app.set('models', models);
app.set('sequelize', sequelize);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

useRoutes();

console.log('use env: ', config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    error: {
      name: err.name,
      message: err.message,
    },
  });
});

module.exports = app;
