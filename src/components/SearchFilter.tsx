import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Offcanvas, Form, Stack, InputGroup, Dropdown } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { defaultFetchOptions } from "../constants";
import DropDownCheckBox from "./DropDownCheckBox";

type SearchFilterPropsType = {
  reFetchEvents: (newOptions: FetchRequest) => void;
  savedLocations: SavedLocations[] | null;
  category: string;
};

const SearchFilter: React.FC<SearchFilterPropsType> = ({ reFetchEvents, savedLocations, category }) => {
  const [show, setShow] = useState(false);
  const [newOptions, setNewOptions] = useState(defaultFetchOptions);
  const { theme } = useTheme();

  const open = () => {
    document.body.setAttribute("data-bs-theme", theme);
    setShow(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setShow(false);
    reFetchEvents(newOptions);
    setNewOptions(defaultFetchOptions);
  };

  const changeOptions = (newOption: Partial<FetchRequest>) => {
    setNewOptions((prev) => ({ ...prev, ...newOption }));
  };

  useEffect(() => {
    console.log(newOptions);
  }, [newOptions]);

  return (
    <React.Fragment>
      <Button variant={theme} className="ms-auto" onClick={open}>
        <MdOutlineSearch fontSize={16} /> Search Events
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleSubmit} style={{ height: "100vh" }}>
          <Offcanvas.Header closeButton className="d-flex align-items-center">
            <Offcanvas.Title>
              <Stack direction="horizontal" gap={1}>
                <MdOutlineSearch fontSize={24} />
                <Form.Control size="sm" type="text" placeholder="Event Search" />
              </Stack>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ height: "100%" }}>
            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon1">Locations</InputGroup.Text>
              <Form.Select
                onChange={(e) => changeOptions({ location: e.target.value })}
                defaultValue={defaultFetchOptions.location}
              >
                {savedLocations?.map((location) => (
                  <option value={location.location_id} key={location.location_id}>
                    {location.name}
                  </option>
                ))}
                <option value="all">All locations</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon2">Limit</InputGroup.Text>
              <Form.Control
                size="sm"
                type="number"
                max={50}
                min={0}
                onChange={(e) => changeOptions({ limit: +e.target.value })}
                defaultValue={defaultFetchOptions.limit}
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <DropDownCheckBox changeOptions={changeOptions} />
            </InputGroup>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Offcanvas.Body>
        </Form>
      </Offcanvas>
    </React.Fragment>
  );
};

export default SearchFilter;
