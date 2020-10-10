import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Download from '@axetroy/react-download';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './App.css';
import DataTable from '../DataTable/DataTable';
import DescriptorTable from '../DescriptorTable/DescriptorTable';

const NUMBER_OF_VALUES = 61;

const CreateFakeData = () => {
  const data = [];

  const baseValue = 33;
  for (let index = 0; index < NUMBER_OF_VALUES; ++index) {
    data.push(baseValue + index);
  }

  return data;
}

const App = () => {
  const [values, setValues] = useState(CreateFakeData());
  
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
      // Do whatever you want with the file contents
        const byteArray = reader.result;
        const typedArray = new Uint8Array(byteArray);
        const array = [...typedArray];
        setValues(array);
      }
      reader.readAsArrayBuffer(file);
    })
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop});


  const onValueChanged = (itemIndex, newValue) => {
    setValues(
      values.map( (originalValue, index) =>
        index === itemIndex
        ? newValue
        : originalValue
      )
    );
  };

  return (
    <React.Fragment>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand href="#">
          <img
            alt=""
            src="process.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          USB Descriptor Parsing
        </Navbar.Brand>
        <Nav className="mr-auto">
          <span {...getRootProps()}>
            <input {...getInputProps()} />
            <Button variant="outline-light" block>
              Import Data File
            </Button>
          </span>
          <Download file="export.bin" content={ new Uint8Array(values) }>
            <Button variant="outline-light" block>
              Export Data
            </Button>
          </Download>
        </Nav>
        <Nav>
          <Navbar.Text>
            Build: {process.env.GITHUB_RUN_NUMBER || `TEST`}
          </Navbar.Text>
        </Nav>
      </Navbar>

      <div className="blockContainer">
        <DataTable
          valueChanged={onValueChanged}
          dataValues={values}
        />
        <DescriptorTable
          rawData={values}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
