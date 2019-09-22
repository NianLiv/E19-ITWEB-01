import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import layouts from 'express-ejs-layouts';
import expressSession from 'express-session';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';
import passport from 'passport';
import User from './user/models';


const app = express();
const router = express.Router();

mongoose.connect(
    "mongodb://localhost:27017/workoutApp",
    { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

router.use(layouts);
router.use(express.static("public"));
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());
//router.use(expressValidator());

router.use(cookieParser("secretCuisine123"));
router.use(
  expressSession({
    secret: "secretCuisine123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});


// ------------------------ Routes -------------------------- //

router.get('/', (req, res) => {
    res.send('Hello World!'); 
});


// --------------------------------------------------------- //


app.use('/', router);
app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`);
});