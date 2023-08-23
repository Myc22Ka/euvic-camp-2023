import React, { useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES } from "../constants";

type DropDownCheckboxPropsType = {
  changeOptions: (newOption: Partial<FetchRequest>) => void;
  selected: string;
};

const DropDownCheckBox: React.FC<DropDownCheckboxPropsType> = ({ changeOptions, selected }) => {
  const checkBoxRef = useRef<HTMLDivElement>(null);
  const [isChecked, setIsChecked] = useState(
    CATEGORIES.map((e, i) => ({ name: e.name.split(" ").join("-"), checked: e.name === selected, id: i }))
  );
  const { theme } = useTheme();

  const handleSetAllCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prev) => prev.map((item) => ({ ...item, checked: e.target.checked })));

    changeOptions({
      category: e.target.checked ? isChecked.map((category) => category.name.toLowerCase()).join(",") : "",
    });
  };

  const handleChange = (id: number) => {
    const updatedChecked = isChecked.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));

    const selectedCategories = updatedChecked
      .filter((item) => item.checked)
      .map((item) => item.name.toLowerCase())
      .join(",");

    setIsChecked(updatedChecked);

    changeOptions({ category: selectedCategories });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant={theme} id="dropdown-custom-components">
        Categories
      </Dropdown.Toggle>

      <Dropdown.Menu variant={theme} className="p-2">
        <Form.Check type="checkbox" id={`default-checkbox0`} label="All" onChange={handleSetAllCategories} />
        <div ref={checkBoxRef}>
          {CATEGORIES.map((item, key) => {
            return (
              <Form.Check
                key={key}
                type="checkbox"
                id={`default-checkbox${key + 1}`}
                label={item.name}
                checked={isChecked[key].checked}
                onChange={() => handleChange(key)}
              />
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownCheckBox;
