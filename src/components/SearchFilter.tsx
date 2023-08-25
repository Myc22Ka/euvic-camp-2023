import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button, Offcanvas, Form, Stack, InputGroup } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES, defaultFetchOptions } from "../constants";
import DropDownCheckBox from "./DropDownCheckBox";
import { useFetchCounts } from "../hooks/useFetchCounts";
import PHQFromTo from "./PHQFromTo";

type SearchFilterPropsType = {
  reFetchEvents: (newOptions: FetchRequest) => void;
  savedLocations: SavedLocations[] | null;
};

const SearchFilter: React.FC<SearchFilterPropsType> = ({ reFetchEvents, savedLocations }) => {
  const [show, setShow] = useState(false);
  const [newOptions, setNewOptions] = useState(defaultFetchOptions);
  const formRef = useRef(null);
  const { counts } = useFetchCounts();
  const { theme } = useTheme();

  const open = useCallback(() => {
    document.body.setAttribute("data-bs-theme", theme);
    setShow(true);
  }, [theme]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setShow(false);
      reFetchEvents(newOptions);
      setNewOptions(defaultFetchOptions);
    },
    [reFetchEvents, newOptions]
  );

  const changeOptions = useCallback(
    (newOption: Partial<FetchRequest>) => setNewOptions((prev) => ({ ...prev, ...newOption })),
    [newOptions]
  );

  // useEffect(() => {
  //   console.log(newOptions);
  // }, [newOptions]);

  return (
    <React.Fragment>
      <Button variant={theme} className="ms-auto" onClick={open}>
        <MdOutlineSearch fontSize={16} /> Search Events
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton className="d-flex align-items-center">
          <Offcanvas.Title>
            <Stack direction="horizontal" gap={1}>
              <MdOutlineSearch fontSize={24} />
              <Form.Control
                size="sm"
                type="text"
                placeholder="Event Search"
                onChange={(e) => changeOptions({ q: e.target.value, location: "" })}
                name="search"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") handleSubmit(e);
                }}
              />
            </Stack>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ height: "100%" }} className="d-flex flex-column justify-content-between">
          <Form onSubmit={handleSubmit} className="d-flex flex-column h-100 justify-content-between" ref={formRef}>
            <Form.Group>
              <InputGroup className="mb-2">
                <InputGroup.Text id="basic-addon1">Locations</InputGroup.Text>
                <Form.Select
                  onChange={(e) => changeOptions({ location: e.target.value })}
                  defaultValue={defaultFetchOptions.location}
                  disabled={Boolean(newOptions.q) || Boolean(newOptions.state) || Boolean(newOptions.label)}
                  name="locations"
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
                  max={defaultFetchOptions.limit * 5}
                  min={0}
                  onChange={(e) => changeOptions({ limit: +e.target.value })}
                  defaultValue={defaultFetchOptions.limit}
                  name="limit"
                />
              </InputGroup>

              <InputGroup className="mb-2">
                <InputGroup.Text id="basic-addon3">PHQ Attendance</InputGroup.Text>
                <PHQFromTo changeOptions={changeOptions} />
              </InputGroup>

              <Stack direction="horizontal" gap={1}>
                <InputGroup className="mb-2 justify-content-center">
                  <DropDownCheckBox
                    title="Categories"
                    changeOptions={changeOptions}
                    parameter="category"
                    itemsList={CATEGORIES}
                  />
                </InputGroup>
                <InputGroup className="mb-2 justify-content-center">
                  <DropDownCheckBox
                    title="Labels"
                    changeOptions={changeOptions}
                    parameter="label"
                    itemsList={counts ? Object.keys(counts?.labels) : []}
                  />
                </InputGroup>
                <InputGroup className="mb-2 justify-content-center">
                  <DropDownCheckBox
                    title="Event status"
                    changeOptions={changeOptions}
                    parameter="state"
                    itemsList={["Active", "Predicted", "Canceled"]}
                  />
                </InputGroup>
              </Stack>
            </Form.Group>

            <Button variant="flat" type="submit">
              Find Events
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default SearchFilter;
