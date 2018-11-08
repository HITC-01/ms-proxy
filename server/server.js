const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('express-http-proxy');

app.use(morgan('dev'));

app.use('/songs/:songId', express.static(path.join(__dirname, '../public')));

app.use('/comments/*', 
    proxy('http://localhost:3003/', {
      proxyReqPathResolver: (req) => {
        console.log('Redirecting to 3003');
        return req.originalUrl;
      },
    }
));

app.use('/player/*', 
    proxy('http://localhost:3004/', {
        proxyReqPathResolver: (req) => {
          console.log('Redirecting to 3004');  
          return req.originalUrl;
        }
    }
));

app.use('/user/*', 
    proxy('http://localhost:3001/', {
        proxyReqPathResolver: (req) => {
          console.log('Redirecting to 3001');
          return req.originalUrl;
        }
    }
));

app.use('/related/*', 
    proxy('http://localhost:3002/', {
        proxyReqPathResolver: (req) =>  {
            console.log('Redirecting to 3002');
            return req.originalUrl;
        }
    }
));


app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});