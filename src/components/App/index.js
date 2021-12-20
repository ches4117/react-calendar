import React, { useState } from "react";
import moment from "moment";
import Calendar from "../Calendar";
import "./index.css";

function App() {
  const [dateObject, setDateObject] = useState(moment());
  const todayObject = moment();
  const handleRangeChange = (addType, preDateObject, action) => {
    if (addType === "yearRange") {
      if (action === "+") {
        setDateObject(preDateObject.clone().add(10, "years"));
      } else {
        setDateObject(preDateObject.clone().add(-10, "years"));
      }
    } else {
      if (action === "+") {
        setDateObject(preDateObject.clone().add(1, addType));
      } else {
        setDateObject(preDateObject.clone().add(-1, addType));
      }
    }
  };
  const handleDateObjectChange = (newObjet) => {
    setDateObject(newObjet);
  };

  return (
    <Calendar
      dateObject={dateObject}
      todayObject={todayObject}
      handleRangeChange={handleRangeChange}
      handleDateObjectChange={handleDateObjectChange}
    />
  );
}

export default App;
