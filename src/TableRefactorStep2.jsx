import {useState} from "react";
import classes from "./Table.module.css";
function Table({ issues }) {
  const [checkedById, setCheckedById] = useState(new Map());

  // 불필요한 상태 변수 없애기:
  // const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] = useState(false);
  // const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);

  // id와 issues 배열로 도출 할 수 있음
  const openIssues = issues.filter(({ status}) => status === 'open'); // 활성화 된 아이템들
  const numberOpenIssues = openIssues.length; // 활성화 된 아이템의 길이
  const numberCheckedIssues = checkedById.size; // 선택된 체크 박스 길이


  const handleOnChange  = (id) => {
    const updatedCheckedById = new Map(checkedById)
    if (updatedCheckedById.get(id)) {
      updatedCheckedById.delete(id)
    } else {
      updatedCheckedById.set(id, true)
    }
    setCheckedById(updatedCheckedById);

    const totalSelected = updatedCheckedById.size // 선택 된 체크박스의 갯수
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
    }
    if (total > 0 && total < count) {
      indeterminateCheckbox.indeterminate = true;
    }
    if (total === count) {
      indeterminateCheckbox.indeterminate = false;
    }
  };

  const handleSelectDeselectAll = (e) => {
    if (e.target.checked) {
      const allChecked = new Map(openIssues.map(({ id }) => [id, true]));
      setCheckedById(allChecked);
    } else {
      setCheckedById(new Map());
    }
  };

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
            checked={numberOpenIssues === numberCheckedIssues} // 활성화 된 아이템 길이와, 체크 된 길이가 같다. == 모두 선택
            onChange={handleSelectDeselectAll}
          />
        </th>
        <th className={classes.numChecked}>
          {numberOpenIssues
            ? `Selected ${numberOpenIssues}`
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
        issues.map(({ id, name, message, status }, index) => {
          let issueIsOpen = status === 'open';
          let onClick = issueIsOpen ? () => handleOnChange(id) : null;
          let stylesTr = issueIsOpen
            ? classes.openIssue
            : classes.resolvedIssue;

          return (
            <tr
              className={stylesTr}
              style={{ backgroundColor: checkedById.get(id) ? '#eee' : '#fff'}}
              key={id}
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
                    checked={Boolean(checkedById.get(id))}
                    onChange={() => handleOnChange(id)}
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
