import React, { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone'
import Download from '@axetroy/react-download';

import Button from 'react-bootstrap/Button'

import './App.css';
import DataTable from '../DataTable/DataTable'
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
    <div>
      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <span {...getRootProps()}>
              <input {...getInputProps()} />
              <Button variant="outline-primary" size="lg" block>
                Import Data File
              </Button>
            </span>
          </section>
        )}
      </Dropzone>
      <Download file="export.bin" content={ new Uint8Array(values) }>
        <Button variant="outline-primary" size="lg" block>
          Export Data
        </Button>
      </Download>
      <div class="blockContainer">
        <DataTable
          valueChanged={onValueChanged}
          dataValues={values}
        />
        <DescriptorTable
          rawData={values}
        />
      </div>
    </div>
  );
}

export default App;
