# Backend Helper

## Setup

`npm install git+ssh://git@118.68.218.91:fpt.work/helper/backend-helper.git`

## Usage

### Authentication

```javascript
const fworkHelper = require('@fwork/backend-helper');

//For route use
router.use('/messages', fworkHelper.isAuthenticated, require('../api/controllers/message.controller'));

//For specific router
router.get('/', fworkHelper.isAuthenticated, (req, res, next) => {
  roomService.getRooms(req)
    .then(result => {
      ...
    })
    .catch(next);
});
```

### Validation

```javascript
const fworkHelper = require('@fwork/backend-helper');
const roomValidate = require('../validations/room.validation');

//For specific router
router.post('/', fworkHelper.validateInput(roomValidate), (req, res, next) => {
  roomService.createRoom(req)
    .then(result => {
      ...
    })
    .catch(next);
});
```

### Handle errors, Handle 404

```javascript
const fworkHelper = require('@fwork/backend-helper');

app.use(fworkHelper.notFoundHandle);
app.use(fworkHelper.errorHandle);


//Throw error in code
throw {
  status: 401, //response status code
  message: 'Unauthorized' // message for response
  errors: [ //errors is optional
    {...},
    {...},
    ...
  ]
}

```

### Format response

- JSON Structures

```javascript
res.json({
  success: true,
  data: req.data,
  message: req.message ? req.message : null,
});
```

- Implement code

### Fetch Data

```javascript

const fworkHelper = require('@fwork/backend-helper');

const AUTH_ENDPOIND = process.env.FWORK_API_ENDPOINT + "/iam" ||
      `https://dev.fpt.work/api/v1/iam`;

const {authorization} = req.headers;
const url = `${process.env.IAM_BACKEND}/authorization/${process.env.ID_PROJECT}`;
const params = {  //For GET method. Default = {}
  userId: 123,
  name: 'Fwork'
}

const data = {  //For POST method. Default = null
  userId: 123,
  name: 'Fwork'
};
// Option 1
fworkHelper.fetchAPI(url, method = 'GET', authorization, data, params)
  .then(data => {
    const user = data.user;
    const resource = data.permissions.filter(item => item.resourceCode === resourceCode);
    if (!user) {
      throw {status: HttpStatus.NOT_FOUND, message: "User doesn't exist !"};
    }
    ...
  })
  .catch(next);

//Option 2
fworkHelper.fetchAPI({
	url,
	method: 'GET',
	authorization,
	data,
	params
})
  .then(data => {
    const user = data.user;
    const resource = data.permissions.filter(item => item.resourceCode === resourceCode);
    if (!user) {
      throw {status: HttpStatus.NOT_FOUND, message: "User doesn't exist !"};
    }
    ...
  })
  .catch(next);
// Async/Await

async function getUsers() {
  try {
    let users = await fworkHelper.fetchAPI(url, method = 'GET', authorization);
  } catch (e) {
    throw e;
  }
}

```
### jaeger + Metrics

```javascript
const fworkHelper = require('@fwork/backend-helper');
const tracer = fworkHelper.initTracer("service_backend");
.
.
.
app.use(cors());

// k8s api heath check
app.use(fworkHelper.health);
app.use(fworkHelper.tracing(tracer));

// mount api v1 routes
app.use('/api/v1/service-path', require('./routes'));
// if error is not an instanceOf APIError, convert it.
app.use(fworkHelper.notFoundHandle);
app.use(fworkHelper.errorHandle);
```
### dev.env

```javascript
NODE_ENV=production
PORT=9211
FWORK_API_ENDPOINT=http://private-gateway:6996/api/v1
PROJECT_CODE=xxxxxx
MULTIPLE_DATABASE=true
PREFIX_DB=booking_
JAEGER_ENDPOINT=http://jaeger-collection.fpt.work:14268/api/traces
MONGODB_URI=mongodb://user:passwork@host:port/db?authSource=admin
```
`cp dev.env .env`
.env
```javascript
...
FWORK_API_ENDPOINT=http://fpt.work/api/v1 OR FWORK_API_ENDPOINT=https://dev.fpt.work/api/v1
...
```