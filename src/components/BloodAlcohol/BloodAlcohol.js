import React from "react";
import {MenuItem, TextField} from "@material-ui/core";
const genders = ['man','woman'];
function BloodAlcohol ()  {
  const [gender, setGender] = React.useState('man');

  const handleChange = (event) => {
    setGender(event.target.value);
  };
    return(
        <>
        <form>
          <TextField
              id="standard-select-gender"
              select
              label="Select"
              value={gender}
              onChange={handleChange}
              helperText="Please select your gender"
          >
            {genders.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
            ))}
          </TextField>

        </form>


        </>
    );

}

export default BloodAlcohol;
