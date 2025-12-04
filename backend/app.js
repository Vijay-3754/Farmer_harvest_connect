const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');


const fs = require('fs').promises;
const path = require('path');
const configPath = path.resolve(__dirname, 'helpers', 'config.json');

const machineId = require('node-machine-id');
let machineID; // Declare machineID variable
const defaultLicense = {
  licenseCode: 'u3Y65£,;7Y#I',
  deviceId: '1e6c538423cab15a413bd87c33c15c1df9772aeb722e1aaec74429aaa7a4b139'
};

const LICENSE_CHECK_DISABLED = process.env.LICENSE_CHECK_DISABLED === 'true';

let licenseConfig = { ...defaultLicense };

// Load license config once so we can fall back if env vars are missing
fs.readFile(configPath, 'utf-8')
  .then((data) => {
    const parsed = JSON.parse(data);
    if (parsed?.license) {
      licenseConfig = {
        licenseCode: parsed.license.licenseCode || defaultLicense.licenseCode,
        deviceId: parsed.license.deviceId || defaultLicense.deviceId,
      };
    }
  })
  .catch(() => {
    console.warn('License config file missing; relying on environment variables.');
  });

const getEffectiveLicense = () => ({
  licenseCode: process.env.LICENSE_CODE || licenseConfig.licenseCode,
  deviceId: process.env.LICENSE_DEVICE_ID || licenseConfig.deviceId,
});

// Get the machine ID
machineId.machineId()
  .then(id => {
    machineID = id;
  })
  .catch(error => {
    console.error('Error getting machine ID:', error);
  });

// Middleware to check for a valid license
app.use(async (req, res, next) => {
  if (LICENSE_CHECK_DISABLED) {
    return next();
  }

  const effectiveLicense = getEffectiveLicense();

  if (!effectiveLicense.licenseCode || !effectiveLicense.deviceId) {
    console.error('License configuration missing. Set LICENSE_CODE and LICENSE_DEVICE_ID or provide helpers/config.json.');
    return res.status(500).json({ message: 'Server license configuration error' });
  }

  if (!machineID) {
    console.error('Machine ID not available yet. Rejecting request.');
    return res.status(503).json({ message: 'License validation pending' });
  }

  if (effectiveLicense.deviceId === machineID) {
    return next();
  }

  console.error('Invalid license or device ID. Request blocked.');
  return res.status(403).json({ message: 'Invalid license' });
});


require('dotenv').config();

app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());

//app.use(bodyParser.json());
app.use(morgan('tiny'));


//"email": "john.doe@example.com",
//"password": "yourpassword"

//Routes

const feedbackRoutes = require('./routes/feedback');
const requestRoutes = require('./routes/request');
const cropRoutes = require('./routes/crop');
const usersRoutes = require('./routes/users');
const harvestRoutes = require('./routes/harvest');
const rateRoutes = require('./routes/rate');
const serviceRoutes = require('./routes/service');
const croprequestRoutes = require('./routes/croprequest');
const agriculturalInputsRoutes = require('./routes/agriculturalInputs');
const ordersRoutes = require('./routes/orders');


const api = process.env.API_URL;

app.use('/public', express.static('public'));
app.use(`${api}/crop`, cropRoutes);
app.use(`${api}/request`, requestRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/harvest`, harvestRoutes);
app.use(`${api}/rate`, rateRoutes);
app.use(`${api}/service`, serviceRoutes);
app.use(`${api}/croprequest`, croprequestRoutes);
app.use(`${api}/agricultural-inputs`, agriculturalInputsRoutes);
app.use(`${api}/orders`, ordersRoutes);




//CONNECTION_STRING = 'mongodb://localhost:27017/';
//  http://localhost:4000/api/v1/business/


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // Add this line
  dbName: 'farmer_harvest_new'
})
  .then(() => {
    console.log('Database Connection is ready...')
  })
  .catch((err) => {
    console.log(err);
  })

const PORT = process.env.PORT || 4000;

//Server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})

{/*
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
*/}