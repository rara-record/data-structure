import {useMemo, useRef, useState} from "react";
import classes from "./Table.module.css";
function Table({ issues }) {
  const topCheckbox = useRef();
  const [checkedById, setCheckedById] = useState(new Map());

  const openIssues = useMemo(
    () => issues.filter(({ status }) => status === "open"),
    [issues]
  );

  console.log(checkedById)

  const numberOpenIssues = openIssues.length;
  const numberCheckedIssues = checkedById.size;

  const handleOnChange  = (id) => {
    const updatedCheckedById = new Map(checkedById)
    if (updatedCheckedById.get(id)) {
      updatedCheckedById.delete(id)
    } else {
      updatedCheckedById.set(id, true)
    }
    setCheckedById(updatedCheckedById);

    const updatedNumberChecked = updatedCheckedById.size;

    // ref 참조 + numberOpenIssues 재사용
    topCheckbox.current.indeterminate =
      updatedNumberChecked > 0 && updatedNumberChecked < numberOpenIssues
  }

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
            ref={topCheckbox}
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
        issues.map(({ id, name, message, status }) => {
          let isIssueOpen = status === 'open';

          return (
            <tr
              className={isIssueOpen ? classes.openIssue : classes.resolvedIssue}
              style={{ backgroundColor: checkedById.get(id) ? '#eee' : '#fff'}}
              key={id}
            >
              <td>
                <input
                  className={classes.checkbox}
                  type={"checkbox"}
                  checked={Boolean(checkedById.get(id))}
                  onChange={() => handleOnChange(id)}
                  disabled={!isIssueOpen}
                />
              </td>
              <td>{name}</td>
              <td>{message}</td>
              <td>
                <span className={isIssueOpen ? classes.greenCircle : classes.redCircle} />
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
