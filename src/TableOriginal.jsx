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

  const handleOnChange = () =>{}

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

     <tbody>
     {
       issues.map(({ name, message, status }, index) => {
         let issueIsOpen = status === 'open';
         let onClick = issueIsOpen ? () => handleOnChange(index) : null;
         let stylesTr = issueIsOpen
           ? classes.openIssue
           : classes.resolvedIssue;

         return (
           <tr
             className={stylesTr}
             style={checkedState[index]}
             key={index}
             onClick={onClick}
           >
             <td>
               {issueIsOpen ? (
                 <input
                   className={classes.checkbox}
                   type={"checkbox"}
                   id={`custom-checkbox-${index}`}
                   name={name}
                   value={name}
                   checked={checkedState[index].checked}
                   onChange={() => handleOnChange(index)}
                 />
               ) : (
                 <input
                   className={classes.checkbox}
                   type={"checkbox"}
                   disabled
                 />
               )}
             </td>
           </tr>
         )
       })
     }
     </tbody>
    </table>
  );
}
export default Table;
