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

  // const handleIndeterminateCheckbox = (total) => {
  //   const indeterminateCheckbox = document.getElementById(
  //     "custom-checkbox-selectDeselectAll"
  //   );
  //   let count = 0;
  //
  //   issues.forEach((element) => {
  //     if (element.status === "open") {
  //       count += 1;
  //     }
  //   });
  //
  //   if (total === 0) {
  //     indeterminateCheckbox.indeterminate = false;
  //     setSelectDeselectAllIsChecked(false);
  //   }
  //   if (total > 0 && total < count) {
  //     indeterminateCheckbox.indeterminate = true;
  //     setSelectDeselectAllIsChecked(false);
  //   }
  //   if (total === count) {
  //     indeterminateCheckbox.indeterminate = false;
  //     setSelectDeselectAllIsChecked(true);
  //   }
  // };

