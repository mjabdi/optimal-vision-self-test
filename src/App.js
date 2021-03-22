import "./App.css";
import Checkout from "./checkout";
import WelcomeForm from "./WelcomeForm";
import AgreementForm from "./AgreementForm";
import GlobalState from "./GlobalState";
import React, { useEffect } from "react";
import BookService from "./services/BookService";
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import DateTimeForm from "./DateTimeForm";
import FinalResultsForm from "./FinalResultsForm";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";

const getReferrer = () => {
  let search = window.location.search;
  if (search && search.indexOf("?ref=") === 0)
  {
    return search.substr(5)
  }


  return "";
};

function App() {
  const [state, setState] = React.useState({
    activeStep: 0,
    bookingDate: null,
    persons: [],
  });

  useEffect(() => {

    const referrer = getReferrer()
    setState(state => ({...state, referrer : referrer}))

  }, []);

  
  return (
    <GlobalState.Provider value={[state, setState]}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <div className="App">
          {!state.step1Done && <Step1Form/>}
          {state.step1Done && !state.step2Done && <Step2Form/>}
          {state.step1Done && state.step2Done && state.booking && !state.finished && <DateTimeForm/>}

          {state.step1Done && state.step2Done && state.booking && state.finished && <FinalResultsForm />}
        </div>
      </MuiThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;
