import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import GlobalState from "./GlobalState";
import * as EmailValidator from "email-validator";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import HttpsIcon from "@material-ui/icons/Https";

import { BrowserView, MobileView, isMobile } from "react-device-detect";

import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";

import logoImage from "./images/logo.png";

import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import faq from "./FAQ";

import gynaeImage from "./images/gynae-clinic.png";
import BookService from "./services/BookService";
import QuestionBox from "./QuestionBox";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="#">
        <strong> Medical Express Clinic </strong>
      </Link>
      {isMobile ? " " : " All rights reserved."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: "center",
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: "auto",
      marginRight: "auto",
    },
    letterSpacing: "0.8px",
  },
  paper: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(1200 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(5),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px",
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px",
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
  },

  privacyButton: {
    marginBottom: "20px",
    width: "115px",
    color: "#fff",
    backgroundColor: "#444",
    "&:hover": {
      background: "#000",
      color: "#fff",
    },
  },

  faqButton: {
    marginBottom: "20px",
    marginLeft: "10px",
    backgroundColor: "#444",
    "&:hover": {
      background: "#000",
      color: "#fff",
    },
    width: "115px",
    color: "#fff",
  },

  textContent: {
    color: "#666f77",
    fontSize: "1.1rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "2.2em",
    fontWeight: "400",
  },

  textContentMobile: {
    color: "#666f77",
    fontSize: "0.9rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "1.5rem",
    fontWeight: "400",
  },

  getStartedButton: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  AirIcon: {
    marginRight: "10px",
    fontSize: "32px",
  },

  pageTitle: {
    color: theme.palette.secondary.main,
    fontSize: "1.6rem",
    fontWeight: "600",
  },

  BookButton: {
    width: "300px",
    height: "50px",
    borderRadius: "30px",
    fontSize: "1.1rem",
    color: "#fff",
    fontWeight: "600",
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    padding: "10px 20px",
    marginTop: "40px",
    transition: "all 0.3s ease",
    "&:hover" : {
      backgroundColor: theme.palette.primary.main,
    }
  },

  backdrop: {
    zIndex: 999,
    color: "#fff",
  },
}));

const questionArray = [
{title : "What do you usualy wear... *", questions: ["Glasses", "Contact Lenses", "Glasses and Contact Lenses", "None"]},
{title : "How old are you ? *", questions: ["Under 20", "20-40", "41-55", "55+"]},
{title : "What is the main issue of your vision *", questions: ["Blurry for seeing far away", "Blurry for seeing up close", "Overall blurry vision", "Trouble with reading only","I have lazy eye","I was told I have eye disease"]},
{title : "What is bothering you the most *", questions: ["I am tired of my glasses", "My contact lenses make my eye dry", "Have many glasses and keep losing them", "Tired of spending too much money on glasses/contact lenses wish to wake up and not look for my glasses"]},
{title : "Have you ever been told you have astigmatism? *", questions: ["Yes", "No"]},
]

export default function Step1Form() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [questionAnswers, setQuestionAnswers] = React.useState(new Map())

  const [questionErrors, setQuestionErrors] = React.useState([])
  //// ** Dialog

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const [saving, setSaving] = React.useState(false);


  const getValueof = (title) =>
  {
    return questionAnswers[title]
  }

  
  const setValueof = (title, value) =>
  {
    const _temp = questionAnswers
    _temp.set(title,value)
    setQuestionAnswers(_temp)
    setQuestionErrors((prev) => (prev.filter(e => e !== title)))
  }

  const getErrorof = (title) =>
  {
    return questionErrors.findIndex(e => e === title) >= 0
  }

  const buttonClicked = () =>
  {
    if (!validateData())
    {
      return
    }

    setState(state => ({...state, step1Done: true, questionAnswers: questionAnswers}))
  }

  const validateData = () =>
  {
    let error = false
    questionArray.forEach( item => {
      if (!questionAnswers.has(item.title))
      {
        error = true
        if (!questionErrors.find(e => e === item.title))
          setQuestionErrors((prev) => ([...prev, item.title]))
      }else
      {
        setQuestionErrors((prev) => (prev.filter(e => e !== item.title)))
      }
    })

    return !error
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <img
              src="https://www.optimalvision.co.uk/public/design/images/logo.png"
              alt="logo"
            />
          </div>

          <div
            style={{ textAlign: "left", color: "#969696", fontSize: "16px" }}
          >
            Step 1 of 2
          </div>
          <div
            style={{
              backgroundColor: "#eaedf0",
              padding: "8px",
              borderRadius: "30px",
              marginBottom: "20px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                lineHeight: "1.7rem",
                borderRadius: "3rem",
                backgroundColor: "#c2c3c3",
              }}
            >
              <div
                style={{
                  width: "0%",
                  backgroundColor: "#17a2b8",
                  fontSize: "0.75rem",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    color: "#013661",
                    fontSize: "16px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontWeight: "500",
                  }}
                >
                  0%
                </span>
              </div>
            </div>
          </div>

          <Grid
            container
            spacing={4}
            alignItems="baseline"
            style={{ marginTop: "10px" }}
          > 
            {questionArray.map(item => (
              <Grid item xs={12} md={6}>
                <QuestionBox
                  questions={item.questions}
                  title={item.title}
                  valueChanged={(value) => setValueof(item.title, value)}
                  error={getErrorof(item.title)}
                  value={getValueof(item.title)}
                />
                
              </Grid>
            ))}
          </Grid>

          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <div className={classes.BookButton} onClick={buttonClicked}>
              SHOW MY RESULTS!
            </div>
          </div>

          {/* <div
            style={{
              marginTop: "20px",
              color: "#999",
              fontSize: "0.8rem",
              width: "100%",
              textAlign: "left",
            }}
          >
            We will never share your data with 3rd parties for marketing
            purposes. For more information about how Optimal Vision uses, shares
            and protects your personal data, see our
            <a
              href="https://www.optimalvision.co.uk/privacy-policy"
              target="_blank"
              style={{ color: "#777", marginLeft: "5px" }}
            >
              Privacy Policy
            </a>
          </div> */}

          <Backdrop className={classes.backdrop} open={saving}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </main>
    </React.Fragment>
  );
}
