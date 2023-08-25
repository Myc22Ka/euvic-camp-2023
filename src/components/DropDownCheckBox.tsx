import React, { useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES_TYPE } from "../constants";

type DropDownCheckboxPropsType = {
  changeOptions: (newOption: Partial<FetchRequest>) => void;
  parameter: "state" | "category" | "label";
  itemsList: CATEGORIES_TYPE | Array<string>;
  title: string;
};

const DropDownCheckBox: React.FC<DropDownCheckboxPropsType> = ({ changeOptions, parameter, itemsList, title }) => {
  const checkBoxRef = useRef<HTMLDivElement>(null);
  const [isChecked, setIsChecked] = useState(
    itemsList.map((e, i) => ({
      [parameter]: typeof e === "string" ? e : e.name.split(" ").join("-"),
      checked: false,
      id: i,
    }))
  );
  const { theme } = useTheme();

  const handleSetAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prev) => prev.map((item) => ({ ...item, checked: e.target.checked })));

    const result = e.target.checked ? isChecked.map((prop) => String(prop[parameter]).toLowerCase()).join(",") : "";

    changeOptions({
      [parameter]: result,
    });
  };

  const handleChange = (id: number) => {
    const updatedChecked = isChecked.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));

    const selectedCheckBoxes = updatedChecked
      .filter((item) => item.checked)
      .map((item) => String(item[parameter]).toLowerCase())
      .join(",");

    setIsChecked(updatedChecked);

    changeOptions({ [parameter]: selectedCheckBoxes });
  };

  return (
    <Dropdown as="button">
      <Dropdown.Toggle variant={theme} id="dropdown-custom-components">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu
        variant={theme}
        className="p-2"
        style={{ maxHeight: 400, overflowY: parameter === "label" ? "scroll" : "hidden", width: "175%" }}
      >
        {parameter === "category" ? (
          <Form.Check type="checkbox" id={`default-checkbox-${parameter}-0`} label="All" onChange={handleSetAll} />
        ) : null}
        <div ref={checkBoxRef}>
          {itemsList.map((item, key) => (
            <Form.Check
              key={key}
              type="checkbox"
              id={`default-checkbox-${parameter}-${key + 1}`}
              label={typeof item === "string" ? item : item.name}
              checked={isChecked[key].checked}
              onChange={() => handleChange(key)}
            />
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownCheckBox;
