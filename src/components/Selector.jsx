import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PlayerTable from "./Table"

const Operators = () => {
  //functions for getting operator list
  const [operators, getOperators] = useState([]);
  const url = `https://app.aurictouch.com/operator`;
  const getAllOperators = () => {
    axios
      .get(`${url}`)
      .then((response) => {
        const allOperators = response.data;
        getOperators(allOperators.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  getAllOperators();
  return operators;
};

const Selector = () => {
  // state to pass props for the table
  const [state, setState] = useState({operator:"", operatorGameType:"", operatorName:""});
  const operators = Operators();
  const [operator, setOperator] = useState("");
  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
    getAllOperatorGameTypes(event.target.value);
  };

  //functions for getting operatorGameType list
  const [operatorGameTypes, getOperatorGameTypes] = useState([]);
  const getAllOperatorGameTypes = (operator) => {
    let URL = `https://app.aurictouch.com/operatorGameType?operator=${operator}`;
    axios.get(`${URL}`).then((response) => {
      const allOperatorGameTypes = response.data;
      getOperatorGameTypes(allOperatorGameTypes.data);
    });
  };

  const [operatorGameType, setOperatorGameType] = useState("");
  const handleOperatorGameTypeChange = (event) => {
    setOperatorGameType(event.target.value);
    getAllOperatorNames(event.target.value);
  };

  //functions for getting operatorName list
  const [operatorNames, getOperatorNames] = useState([]);
  const getAllOperatorNames = (operatorGameType) => {
    let URL = `https://app.aurictouch.com/operatorName?operator=${operator}&operatorGameType=${operatorGameType}`;
    axios.get(`${URL}`).then((response) => {
      const allOperatorNames = response.data;
      getOperatorNames(allOperatorNames.data);
    });
  };

  const [operatorName, setOperatorName] = useState("");
  const handleOperatorNameChange = (event) => {
    setOperatorName(event.target.value);
    setState({
        operator: operator,
        operatorGameType: operatorGameType,
        operatorName: event.target.value
    })
};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="selectBox">
          <Box sx={{ minWidth: 120 }}>
            <FormControl
              sx={{
                width: "200px",
                margin: "20px",
                background: "black",
                borderRadius: "7px",
              }}
            >
              <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
                Select Operator
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operator}
                label="Operator"
                onChange={handleOperatorChange}
                sx={{ color: "white" }}
              >
                {operators.map((element) => {
                  return <MenuItem value={element}>{element}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl
              sx={{
                width: "200px",
                margin: "20px",
                background: "black",
                borderRadius: "7px",
              }}
            >
              <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
                Select Game Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operatorGameType}
                label="Operator Game Type"
                onChange={handleOperatorGameTypeChange}
                sx={{ color: "white" }}
              >
                {operatorGameTypes.map((element) => {
                  return <MenuItem value={element}>{element}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl
              sx={{
                width: "200px",
                margin: "20px",
                background: "black",
                borderRadius: "7px",
              }}
            >
              <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
                Select Slate Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={operatorName}
                label="Operator Name"
                onChange={handleOperatorNameChange}
                sx={{ color: "white" }}
              >
                {operatorNames.map((element) => {
                  return <MenuItem value={element}>{element}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
      </Box>

      <PlayerTable operator={state.operator} operatorGame={state.operatorGameType} operatorName={state.operatorName}/>
    </>
  );
};

export default Selector;
