import React, { useState } from "react";
import {
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  Button,
  Grid,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Select from "@material-ui/core/Select";
import listOfDrinks from "./drinks";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const genders = [
  { name: "man", value: 1 },
  { name: "woman", value: 2 },
];

export default function BloodAlcohol() {
  const [values, setValues] = useState({
    gender: 1,
    weight: 30,
    elapsedTime: 1,
    drink: [null],
  });
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  const [drink, setDrink] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const reset = () => {
    setValues({
      gender: 1,
      weight: 30,
      elapsedTime: 1,
      drink: [null],
    });

    setResult("");
    setDrink([]);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: parseInt(event.target.value) });
  };

  const handleChange2 = (event) => {
    setDrink([...drink, { ...event.target.value }]);
  };

  const handleDelete = (i) => {
    setDrink(drink.filter((e) => e.id !== i));
  };

  function getSum(total, num) {
    let tmp = getGrammAlcohol(num.alcohol, num.amount);
    return total + tmp;
  }
  const calculate = () => {
    let genderConst = values.gender === 1 ? 0.68 : 0.55;

    let a = drink.reduce(getSum, 0);
    let b = values.weight * 1000 * genderConst;
    console.log(a);
    console.log(b);
    let rtm = (a / b) * 100 - 0.015 * values.elapsedTime;

    setResult(rtm.toFixed(4));
  };

  const getGrammAlcohol = (percentage, volume) => {
    return volume * percentage * 0.789;
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={3}>
        {drink &&
          drink.map((e, i) => (
            <div key={e.name + i}>
              {i + 1}. elem {e.name}
              <Button color="primary" onClick={() => handleDelete(e.id)}>
                {" "}
                <DeleteForeverIcon />{" "}
              </Button>
            </div>
          ))}
      </Grid>
      <Grid item xs={2}>
        <h1>{result}</h1>
      </Grid>
      <Grid item xs={2}>
        <FormControl>
          <TextField
            id="standard-select-gender"
            select
            label="Gender"
            value={values.gender}
            onChange={handleChange("gender")}
            helperText="Please select your gender"
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
            id="standard-select-weight"
            label="Weight"
            type="number"
            value={values.weight}
            onChange={handleChange("weight")}
            helperText="Please select your weight"
          />

          <TextField
            id="standard-select-elapsedTime"
            label="ElapsedTime"
            type="number"
            value={values.elapsedTime}
            onChange={handleChange("elapsedTime")}
            helperText="Please select your elapsedTime"
          />

          <Button variant="contained" color="primary" onClick={calculate}>
            Calculate
          </Button>
        </FormControl>
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add drinks
          </Button>
          <Button variant="contained" color="primary" onClick={reset}>
            Reset
          </Button>
          {/* <Button onClick={() => console.log(drink)}>Drinks</Button> */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add drinks</DialogTitle>
            <DialogContent>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-dialog-native">Drink</InputLabel>
                <Select
                  value={""}
                  onChange={handleChange2}
                  input={<Input id="demo-dialog-native" />}
                >
                  {listOfDrinks.map((el) =>
                    el.amount.map((am, ind) => {
                      return (
                        <MenuItem
                          key={el.name + ind}
                          value={{
                            name: el.name,
                            alcohol: el.alcohol,
                            amount: am.value,
                            type: el.type,
                            id: drink.length,
                          }}
                        >
                          {el.name} {am.name}
                        </MenuItem>
                      );
                    })
                  )}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Exit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </Grid>
  );
}
