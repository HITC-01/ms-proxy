const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('express-http-proxy');

const serverOne = 'http://ec2-54-183-128-92.us-west-1.compute.amazonaws.com/';
const serverTwo = 'http://ec2-54-215-217-201.us-west-1.compute.amazonaws.com/';
const serverThree = 'http://ec2-54-185-4-172.us-west-2.compute.amazonaws.com/';
const serverFour = 'http://ec2-18-222-200-123.us-east-2.compute.amazonaws.com/';

app.use(morgan('dev'));

app.use('/songs/:songId', express.static(path.join(__dirname, '../public')));

app.use('/user/*', 
    proxy(serverOne, {
        proxyReqPathResolver: (req) => {
          console.log('Redirecting to 3001');
          return req.originalUrl;
        }
    }
));

app.use('/player/*', 
    proxy(serverFour, {
        proxyReqPathResolver: (req) => {
          console.log('Redirecting to 3004');  
          return req.originalUrl;
        }
    }
));

app.use('/comments/*', 
    proxy(serverThree, {
      proxyReqPathResolver: (req) => {
        console.log('Redirecting to 3003');
        return req.originalUrl;
      },
    }
));

app.use('/related/*', 
    proxy(serverTwo, {
        proxyReqPathResolver: (req) =>  {
            console.log('Redirecting to 3002');
            return req.originalUrl;
        }
    }
));


app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});