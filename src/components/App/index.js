import React, { useState } from "react";
import moment from "moment";
import Calendar from "../Calendar";

import "./index.css";

function App() {
  const [dateObject, setDateObject] = useState(moment());
  const handleMonthChange = (preDateObject, action) => {
    if (action === "+") {
      setDateObject(preDateObject.clone().add(1, "months"));
    } else {
      setDateObject(preDateObject.clone().add(-1, "months"));
    }
  };

  return (
    <Calendar dateObject={dateObject} handleMonthChange={handleMonthChange} />
  );
}

export default App;
