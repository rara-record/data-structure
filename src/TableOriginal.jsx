import { useState } from "react";
import classes from "./Table.module.css";

function Table({ issues }) {
  const [checkedState, setCheckedState] = useState(new Array(issues.length).fill({
    checked: false,
    backgroundColor: "#ffffff"
  }));
  const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] = useState(
    false
  );
  const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);

  return (
    <table className={classes.table}>
      <thead>
      <tr>
        <th>
          <input
            className={classes.checkbox}
            type={"checkbox"}
            id={"custom-checkbox-selectDeselectAll"}
            name={"custom-checkbox-selectDeselectAll"}
            value={"custom-checkbox-selectDeselectAll"}
            checked={selectDeselectAllIsChecked}
          />
        </th>
        <th className={classes.numChecked}>
          {numCheckboxesSelected
            ? `Selected ${numCheckboxesSelected}`
            : "None selected"
          }
        </th>
      </tr>
      <tr>
        <th />
        <th>Name</th>
        <th>Message</th>
        <th>Status</th>
      </tr>
      </thead>

     <tbody></tbody>
    </table>
  );
}
export default Table;
