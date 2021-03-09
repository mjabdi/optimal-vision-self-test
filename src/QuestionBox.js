import PropTypes from "prop-types";

import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "10px",
    boxShadow: "6px 6px 5px 0px rgba(240,240,240,0.96)",
    zIndex: 2,
  },

  titleBox: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "600",
    padding: "10px",
    textAlign: "center",
    zIndex: -1,
    overflow: "hidden",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },

  questionsBox: {
    padding: "10px",
    textAlign: "left",
    color: theme.palette.secondary.main,
  },
}));

const QuestionBox = ({ title, value, valueChanged, error, questions, children }) => {
  const classes = useStyles();

//   useEffect(() => {
//     if (value) {
//     }
//   }, [value]);

//   useEffect(() => {}, [questions]);

  const handleChange = (event) => {
    valueChanged(event.target.value);
  };

  return (
    <React.Fragment>
      <div
        className={classes.container}
        style={error ? { borderColor: "red" } : {}}
      >
        <div className={classes.titleBox}>{title}</div>

        <div className={classes.questionsBox}>
          <RadioGroup
            aria-label="questions"
            name={`question-${title}`}
            value={value}
            onChange={handleChange}
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
        </div>
        {error && (
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

        <div style={{padding:"0px 30px", marginBottom:"50px"}}>

            {children}

        </div>


      </div>
    </React.Fragment>
  );
};

QuestionBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueChanged: PropTypes.func.isRequired,
  error: PropTypes.bool,
  questions: PropTypes.array.isRequired,
};

export default QuestionBox;
