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
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

import logoImage from "./images/logo.png";

import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import faq from "./FAQ";

import gynaeImage from "./images/gynae-clinic.png";
import BookService from "./services/BookService";
import QuestionBox from "./QuestionBox";

import "./animation.css";

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
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  backdrop: {
    zIndex: 999,
    color: "#fff",
  },

  TextSecondary: {
    color: theme.palette.secondary.main,
  },

  TextPrimary: {
    color: theme.palette.primary.main,
  },

  questionsBox: {
    padding: "20px 10px 0px 10px",
    textAlign: "left",
    color: theme.palette.secondary.main,
  },
}));

const questions = [
  "No - I'm ready to come in!",
  "Money - I'm not sure it's in my budget",
  "Fear - I'm afraid of laser eye surgery",
  "Questions - I still have some questions...",
];

export default function Step2Form() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  const [openToLaser, setOpenToLaser] = React.useState("Yes");
  const [openToLaserError, setOpenToLaserError] = React.useState(false);

  const [stoppingReason, setStoppingReason] = React.useState("");
  const [stoppingReasonError, setStoppingReasonError] = React.useState(false);

  const stoppingReasonChanged = (event) => {
    setStoppingReason(event.target.value);
    setStoppingReasonError(false)
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [fullname, setFullname] = React.useState(state.fullname ?? "");
  const [email, setEmail] = React.useState(state.email ?? "");
  const [phone, setPhone] = React.useState(state.phone ?? "");

  const fullnameChanged = (event) => {
    setFullname(event.target.value);
    setState((state) => ({ ...state, fullname: event.target.value }));
    if (event.target.value && event.target.value.trim().length > 0) {
      setState((state) => ({ ...state, fullnameError: false }));
    }
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setState((state) => ({ ...state, email: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, emailError: false }));
    }
  };

  const phoneChanged = (event) => {
    setPhone(event.target.value);
    setState((state) => ({ ...state, phone: event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 6) {
      setState((state) => ({ ...state, phoneError: false }));
    }
  };

  const buttonClicked = async () =>
  {
    if (!ValidateData())
      return

      setSaving(true)

      try {
        const payload = {
          fullname: fullname,
          email: email,
          phone: phone,
          faceToFaceConsultation: false,
          telephoneConsultation: false,
          questions: state.questionAnswers
        };
        const res = await BookService.bookConsultation(payload);
        setSaving(false);
        if (res.data.status === "OK") {
          setState((state) => ({ ...state, step2Done: true , booking: res.data.booking, timeData : res.data.timeData }));
        }
      } catch (err) {
        console.error(err);
        setSaving(false);
      }
  }

  const ValidateData = () =>
  {
    let error = false

    if (!openToLaser)
    {
      error = true
      setOpenToLaserError(true)
    }else{
      if (openToLaser === "Yes")
      {
        if (!fullname || fullname.length < 1) {
          setState((state) => ({ ...state, fullnameError: true }));
          error = true;
        }
    
        if (!email || !EmailValidator.validate(email)) {
          setState((state) => ({ ...state, emailError: true }));
          error = true;
        }
    
        if (!phone || phone.length < 5) {
          setState((state) => ({ ...state, phoneError: true }));
          error = true;
        }
    
      }else if (openToLaser === "No")
      {
        if (!stoppingReason)
        {
          error = true
          setStoppingReasonError(true)
        }
        else
        {
          if (!fullname || fullname.length < 1) {
            setState((state) => ({ ...state, fullnameError: true }));
            error = true;
          }
      
          if (!email || !EmailValidator.validate(email)) {
            setState((state) => ({ ...state, emailError: true }));
            error = true;
          }
      
          if (!phone || phone.length < 5) {
            setState((state) => ({ ...state, phoneError: true }));
            error = true;
          }
      
        }
      }
    }



    return !error


  }

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
                  justifyContent: "flex-end",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  backgroundImage:
                    "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
                  backgroundSize: "1rem 1rem",
                }}
                className="progress-animated"
              >
                <span
                  style={{
                    fontSize: "16px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontWeight: "700",
                    textAlign: "right",
                    color: "#013661",
                  }}
                >
                  50%
                </span>
              </div>
            </div>
          </div>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ maxWidth: "720px" }}>
              <QuestionBox
                questions={["Yes", "No"]}
                title="Would you be open to a FREE no-obligation laser eye surgery consultation (if it turns out you are a candidate)? *"
                valueChanged={(value) => {
                  setOpenToLaser(value);
                  setOpenToLaserError(false);
                }}
                value={openToLaser}
                error={openToLaserError}
              >
                {openToLaser === "No" && (
                  <div
                    className={classes.TextSecondary}
                    style={{
                      textAlign: "left",
                      fontSize: "0.95rem",
                      lineHeight: "1.5rem",
                      fontWeight: "500",
                    }}
                  >
                    <div>
                      Is There Anything Stopping You From Coming In For A
                      Consult To See If You're A True Laser Eye Surgery
                      Candidate? *
                    </div>
                    <div
                      className={classes.questionsBox}
                      style={
                        stoppingReasonError ? { border: "2px solid red" } : {}
                      }
                    >
                      <RadioGroup
                        aria-label="questions"
                        name={`question-box`}
                        value={stoppingReason}
                        onChange={stoppingReasonChanged}
                      >
                        {questions &&
                          questions.map((question) => (
                            <FormControlLabel
                              value={question}
                              control={<Radio color="primary" />}
                              label={question}
                            />
                          ))}
                      </RadioGroup>

                      {stoppingReasonError && (
                        <div
                          style={{
                            color: "red",
                            textAlign: "left",
                            marginBottom: "10px",
                            fontWeight: "500",
                            paddingLeft: "10px",
                          }}
                        >
                          * This field is required.
                        </div>
                      )}
                    </div>

                    <div
                      style={{ paddingTop: "20px" }}
                      className={classes.TextPrimary}
                    >
                      {stoppingReason === questions[0] && (
                        <div>
                          <p>
                            Please fill out the form below to receive a{" "}
                            <span style={{ fontWeight: "700" }}>callback</span>.
                          </p>
                        </div>
                      )}
                      {stoppingReason === questions[1] && (
                        <div>
                          <p>
                            The cost of laser eye surgery depends on the type of
                            treatment you're having and your prescription
                            requirements, but the range of pricing and finance
                            options at Optical Express make it an affordable
                            solution for all patients.
                          </p>
                          <p>
                            <a
                              href="https://www.optimalvision.co.uk/laser-eye-surgery-costs"
                              target="_blank"
                            >
                              Read more about pricing
                            </a>
                          </p>
                          <p>
                            Our advisers are available to discuss pricing in
                            more detail. Please fill out the form below to
                            receive a{" "}
                            <span style={{ fontWeight: "700" }}>callback</span>.
                          </p>
                        </div>
                      )}
                      {stoppingReason === questions[2] && (
                        <div>
                          <p>
                            Our advisers are available to discuss your fears and
                            concerns in more detail. Please fill out the form
                            below to receive a{" "}
                            <span style={{ fontWeight: "700" }}>callback</span>.
                          </p>
                        </div>
                      )}

                      {stoppingReason === questions[3] && (
                        <div>
                          <p>
                            Our advisers are available to discuss any questions
                            you may have. Please fill out the form below to
                            receive a{" "}
                            <span style={{ fontWeight: "700" }}>callback</span>.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {openToLaser === "Yes" && (
                  <div
                    className={classes.TextSecondary}
                    style={{
                      textAlign: "left",
                      fontSize: "0.95rem",
                      lineHeight: "1.5rem",
                      fontWeight: "500",
                    }}
                  >
                    <div
                      style={{ paddingTop: "20px" }}
                      className={classes.TextPrimary}
                    >
                      <p>
                        Please fill out the form below to receive a{" "}
                        <span style={{ fontWeight: "700" }}>callback</span>.
                      </p>
                    </div>
                  </div>
                )}

                {(openToLaser === "Yes" || stoppingReason) && (
                  <div>
                    <Grid
                      container
                      spacing={3}
                      alignItems="baseline"
                      style={{ marginTop: "10px" }}
                    >
                      <Grid item xs={12}>
                        <TextField
                          error={state.fullnameError ? true : false}
                          required
                          id="full Name"
                          label="Full Name"
                          fullWidth
                          autoComplete="name"
                          value={fullname}
                          onChange={fullnameChanged}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          error={state.phoneError ? true : false}
                          required
                          id="phone"
                          label="Contact Phone Number"
                          fullWidth
                          autoComplete="tel"
                          value={phone}
                          onChange={phoneChanged}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          error={state.emailError ? true : false}
                          required
                          id="email"
                          label="Email Address"
                          fullWidth
                          autoComplete="email"
                          type="email"
                          value={email}
                          onChange={emailChanged}
                        />
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        marginTop: "50px",
                        color: "#999",
                        fontSize: "0.8rem",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      * We will never share your data with 3rd parties for
                      marketing purposes. For more information about how Optimal
                      Vision uses, shares and protects your personal data, see
                      our
                      <a
                        href="https://www.optimalvision.co.uk/privacy-policy"
                        target="_blank"
                        style={{ color: "#777", marginLeft: "5px" }}
                      >
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                )}
              </QuestionBox>
            </div>
          </div>

          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <div className={classes.BookButton} onClick={buttonClicked}>
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
