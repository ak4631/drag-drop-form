import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Toolbox from './ToolBox';
import Editor from './Editor';
import Preview from './Preview';

// import { Box, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Switch } from '@mui/material';
import { Box, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Switch, FormControlLabel, Select, MenuItem } from '@mui/material';
import uuid from 'react-uuid';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';



const FormBuilder = () => {
  // ... (keep existing state variables)
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [layout, setLayout] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [loadJson, setLoadJson] = useState('');
  const unique_id = uuid();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    if (result.source.droppableId === 'toolbox' && result.destination.droppableId === 'editor') {
      const newElement = {
        id: `element-${elements.length + 1}-${unique_id}`,
        type: result.draggableId,
        properties: getDefaultProperties(result.draggableId),
      };
      setElements([...elements, newElement]);
      
      // Calculate the drop position
      const dropIndex = result.destination.index;
      const yPos = layout.length > 0 
        ? Math.max(...layout.map(item => item.y + item.h))
        : 0;

      // Add a new layout item for the new element
      const newLayoutItem = {
        i: newElement.id,
        x: 0,
        y: dropIndex === 0 ? 0 : yPos,
        w: 6,
        h: result.draggableId === 'textarea' ? 4 : 2,
        minH:result.draggableId === 'textarea' ? 4  : 2,
        maxH:result.draggableId === 'textarea' ? 4 : 2,
      };
      setLayout([...layout, newLayoutItem]);
    } else if (result.source.droppableId === 'editor' && result.destination.droppableId === 'editor') {
      const newElements = Array.from(elements);
      const [reorderedItem] = newElements.splice(result.source.index, 1);
      newElements.splice(result.destination.index, 0, reorderedItem);
      setElements(newElements);
      
      // Update the layout to reflect the new order
      const newLayout = newElements.map((element, index) => {
        const existingLayout = layout.find(item => item.i === element.id);
        return {
          ...existingLayout,
          y: index,
        };
      });
      setLayout(newLayout);
    }
  };



  const getDefaultProperties = (type) => {
    switch (type) {
      case 'input':
        return { label: 'Input', placeholder: 'Enter text', required: false };
      case 'textarea':
        return { label: 'Textarea', placeholder: 'Enter long text', required: false };
      case 'checkbox':
        return { label: 'Checkbox', checked: false };
      case 'select':
        return { label: 'Select', options: ['Option 1', 'Option 2', 'Option 3'], required: false };
      case 'radio':
        return { label: 'Radio Button', options: ['Option 1', 'Option 2', 'Option 3'], required: false };
      case 'email':
        return { label: 'Email', placeholder: 'Enter email', required: false };
      case 'phone':
        return { label: 'Phone', placeholder: 'Enter phone number', required: false };
      case 'url':
        return { label: 'URL', placeholder: 'Enter URL', required: false };
      case 'date':
        return { label: 'Date', required: false };
      case 'time':
        return { label: 'Time', required: false };
      case 'button':
        return {label: 'Button', variant: 'contained',color: 'primary',size: 'medium'};
      case 'dateAndTime':
          return {label: 'Date and Time',required: false,value: null,inputFormat: "yyyy/MM/dd HH:mm",mask: "__/__/____ __:__",minDateTime: null,maxDateTime: null,disabled: false,readOnly: false,
          };
      default:
        return {};
    }
  };

  // ... (keep existing functions)

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handlePropertyChange = (property, value) => {
    if (selectedElement) {
      const updatedElements = elements.map((el) =>
        el.id === selectedElement.id
          ? {
              ...el,
              properties: {
                ...el.properties,
                [property]: value,
              },
            }
          : el
      );
      setElements(updatedElements);
      setSelectedElement({
        ...selectedElement,
        properties: { ...selectedElement.properties, [property]: value },
      });
    }
  };

  const handleOptionChange = (index, value) => {
    if (selectedElement && selectedElement.properties.options) {
      const newOptions = [...selectedElement.properties.options];
      newOptions[index] = value;
      handlePropertyChange('options', newOptions);
    }
  };

  const handleAddOption = () => {
    if (selectedElement && selectedElement.properties.options) {
      const newOptions = [...selectedElement.properties.options, `Option ${selectedElement.properties.options.length + 1}`];
      handlePropertyChange('options', newOptions);
    }
  };

  const handleRemoveOption = (index) => {
    if (selectedElement && selectedElement.properties.options) {
      const newOptions = selectedElement.properties.options.filter((_, i) => i !== index);
      handlePropertyChange('options', newOptions);
    }
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleSave = () => {
    const formData = {
      elements,
      layout,
    };
    const json = JSON.stringify(formData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form_data.json';
    link.click();
    URL.revokeObjectURL(url);
    // save this file directly into db
  };

  const handleLoad = () => {
    setLoadDialogOpen(true);
  };

  const handleLoadConfirm = () => {
    try {
      const formData = JSON.parse(loadJson);
      setElements(formData.elements);
      setLayout(formData.layout);
      setLoadDialogOpen(false);
      setLoadJson('');
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDeleteElement = (elementId) => {
    setElements(elements.filter(el => el.id !== elementId));
    setLayout(layout.filter(item => item.i !== elementId));
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
              Save
            </Button>
            <Button variant="contained" onClick={handleLoad} sx={{ mr: 1 }}>
              Load
            </Button>
            <Button variant="contained" onClick={handlePreview}>
              Preview
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Toolbox />
          </Grid>
          <Grid item xs={8}>
            <Editor
              elements={elements}
              layout={layout}
              onElementClick={handleElementClick}
              selectedElement={selectedElement}
              onLayoutChange={handleLayoutChange}
              onDeleteElement={handleDeleteElement}
            />
          </Grid>
          <Grid item xs={2}>
        {selectedElement && (
            <Box
              my={2}
              display="flex"
              gap={2}
              p={2}
              sx={{
                border: '2px solid black',
                flexDirection: 'column',
                fontFamily: 'Monospace',
                fontSize: 16,
                bgcolor: 'white',
                borderRadius: 1,
              }}
            >
              <h3>Properties</h3>
              {Object.entries(selectedElement.properties).map(([key, value]) => {
                if (key === 'options' && Array.isArray(value)) {
                  return (
                    <div key={key}>
                      <h4>Options</h4>
                      {value.map((option, index) => (
                        <div key={index}>
                          <TextField
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                          />
                          <Button onClick={() => handleRemoveOption(index)}>Remove</Button>
                        </div>
                      ))}
                      <Button onClick={handleAddOption}>Add Option</Button>
                    </div>
                  );
                } else if (key === 'required' || key === 'checked') {
                  return (
                    <FormControlLabel
                      key={key}
                      control={
                        <Switch
                          checked={value}
                          onChange={(e) => handlePropertyChange(key, e.target.checked)}
                        />
                      }
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                  );
                } 
                else if (selectedElement.type === 'button' && (key === 'variant' || key === 'color' || key === 'size')) {
                  const options = key === 'variant' 
                    ? ['text', 'contained', 'outlined']
                    : key === 'color'
                    ? ['primary', 'secondary', 'success', 'error', 'info', 'warning']
                    : ['small', 'medium', 'large'];
                  
                  return (
                    <FormControlLabel
                      key={key}
                      control={
                        <Select
                          value={value}
                          onChange={(e) => handlePropertyChange(key, e.target.value)}
                          fullWidth
                        >
                          {options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      labelPlacement="top"
                    />
                  );
                }
                else if (selectedElement.type === 'dateAndTime') {
                  let returnVal = '';
                  if (key === 'value' || key === 'minDateTime' || key === 'maxDateTime') {
                    returnVal=(
                      <LocalizationProvider dateAdapter={AdapterDateFns} key={key}>
                        <DateTimePicker
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          value={value}
                          onChange={(newValue) => handlePropertyChange(key, newValue)}
                          // renderInput={(params) => <TextField {...params} fullWidth />}
                          slots={{
                            textField: (params) => <TextField {...params} fullWidth />
                          }}
                        />
                      </LocalizationProvider>
                    );
                  } else if (key === 'inputFormat' || key === 'mask') {
                    returnVal= (
                      <TextField
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        fullWidth
                      />
                    );
                  }
                  return returnVal;
                }
                else {
                  return (
                    <div key={key} style={{display: 'flex', gap: '1rem', flexDirection:'column'}}>
                      <TextField
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        onChange={(e) => handlePropertyChange(key, e.target.value)}
                        fullWidth
                      />
                    </div>
                  );
                }
              })}
            </Box>
        )}
      </Grid>
        </Grid>
      </Box>
      <Dialog open={loadDialogOpen} onClose={() => setLoadDialogOpen(false)}>
        <DialogTitle>Load Form</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={10}
            fullWidth
            value={loadJson}
            onChange={(e) => setLoadJson(e.target.value)}
            placeholder="Paste your JSON here"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoadDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLoadConfirm}>Load</Button>
        </DialogActions>
      </Dialog>
      <Preview
        open={showPreview}
        onClose={() => setShowPreview(false)}
        elements={elements}
        layout={layout}
      />
    </DragDropContext>
  );
};

export default FormBuilder;

