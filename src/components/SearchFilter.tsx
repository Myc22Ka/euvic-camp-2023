import React, { useState } from "react";
import { Button, Offcanvas, Form, Stack } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { defaultFetchOptions } from "../constants";

type SearchFilterPropsType = {
  reFetchEvents: (newOptions: FetchRequest) => void;
};

const SearchFilter: React.FC<SearchFilterPropsType> = ({ reFetchEvents }) => {
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
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOptions({ ...defaultFetchOptions, limit: +event.currentTarget.value });
  };

  return (
    <React.Fragment>
      <Button variant={theme} className="ms-auto" onClick={open}>
        <MdOutlineSearch fontSize={16} /> Search Events
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleSubmit}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Stack direction="horizontal" gap={1}>
                <MdOutlineSearch fontSize={24} />
                <Form.Control size="sm" type="text" placeholder="Event Search" />
              </Stack>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form.Group>
              <Form.Control
                size="sm"
                type="number"
                placeholder="Limit"
                max={50}
                min={0}
                onChange={handleChange}
                defaultValue={defaultFetchOptions.limit}
              />
            </Form.Group>
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
