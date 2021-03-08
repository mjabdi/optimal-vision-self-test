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

import './animation.css'

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


export default function Step2Form() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [openToLaser, setOpenToLaser] = React.useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const [saving, setSaving] = React.useState(false);


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
            Step 2 of 2
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
                  width: "50%",
                  backgroundColor: "#17a2b8",
                  fontSize: "0.75rem",
                  display: "flex",
                  justifyContent:"flex-end",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
                  backgroundSize : "1rem 1rem"

                }}
                className="progress-animated"
              >
                <span
                  style={{
                    fontSize: "16px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontWeight: "700",
                    textAlign:"right",
                    color: "#013661",
                  }}
                >
                  50%
                </span>
              </div>
            </div>
          </div>

          <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
          <div style={{maxWidth:"720px"}}>
            <QuestionBox
                  questions={["Yes", "No"]}
                  title="Would you be open to a FREE no-obligation laser eye surgery consultation (if it turns out you are a candidate)? *"
                  valueChanged={(value) => setOpenToLaser(value)}
                  value={openToLaser}
                />                
          </div>
          </div>

        
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <div className={classes.BookButton}>
              SHOW MY RESULTS!
            </div>
          </div>


          <Backdrop className={classes.backdrop} open={saving}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Paper>
      </main>
    </React.Fragment>
  );
}
