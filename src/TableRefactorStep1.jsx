import {useState} from "react";
import classes from "./Table.module.css";
function Table({ issues }) {
  const [checkedById, setCheckedById] = useState(new Map()); // key : value 형태로 저장

  const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] = useState(
    false
  );
  const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);

  const handleOnChange  = (id) => { // 전체 배열을 복제하고 반복 할 필요 없이, id 를 받아서, id가 있으면 지우고, 아니면 추가
    const updatedCheckedById = new Map(checkedById)
    if (updatedCheckedById.get(id)) {
      updatedCheckedById.delete(id)
    } else {
      updatedCheckedById.set(id, true)
    }
    setCheckedById(updatedCheckedById); // 체크박스 상태 업데이트

    const totalSelected = updatedCheckedById.size // 선택 된 체크박스의 갯수

    setNumCheckboxesSelected(totalSelected)
    handleIndeterminateCheckbox(totalSelected);
  }

  const handleIndeterminateCheckbox = (total) => {
    const indeterminateCheckbox = document.getElementById(
      "custom-checkbox-selectDeselectAll"
    );
    let count = 0;

    issues.forEach((element) => {
      if (element.status === "open") {
        count += 1;
      }
    });

    if (total === 0) {
      indeterminateCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(false);
    }
    if (total > 0 && total < count) {
      indeterminateCheckbox.indeterminate = true;
      setSelectDeselectAllIsChecked(false);
    }
    if (total === count) {
      indeterminateCheckbox.indeterminate = false;
      setSelectDeselectAllIsChecked(true);
    }
  };


  const handleSelectDeselectAll = (e) =>{
    let {checked} = e.target

    const allTrueArray = [];
    issues.forEach((element) => {
      if (element.status === "open") {
        allTrueArray.push({ checked: true, backgroundColor: "#eeeeee" });
      } else {
        allTrueArray.push({ checked: false, backgroundColor: "#ffffff" });
      }
    });

    const allFalseArray = new Array(issues.length).fill({
      checked: false,
      backgroundColor: "#ffffff"
    });

    checked ? setCheckedState(allTrueArray) : setCheckedState(allFalseArray);

    const totalSelected = (checked ? allTrueArray : allFalseArray)
      .map((element) => element.checked)
      .reduce((sum, currentState, index) => {
        if (currentState && issues[index].status === "open") {
          return sum + issues[index].value
        }
        return sum
      }, 0)
    setNumCheckboxesSelected(totalSelected)
    setSelectDeselectAllIsChecked((prevState) => !prevState);

  }

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
            onChange={handleSelectDeselectAll}
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
              <td>{name}</td>
              <td>{message}</td>
              <td>
                {issueIsOpen ? (
                  <span className={classes.greenCircle} />
                ) : (
                  <span className={classes.redCircle} />
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
