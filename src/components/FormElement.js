import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Box, TextField, Checkbox, FormControlLabel, Select, MenuItem, Radio, RadioGroup, Button, InputLabel, FormControl } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';

const FormElement = ({ element, index, onClick, isSelected }) => {
  console.log(element);
  const renderElement = () => {
    switch (element.type) {
      case 'input':
        return (
          <TextField
            label={element.properties.label}
            placeholder={element.properties.placeholder}
            required={Boolean(element.properties.required)}
            fullWidth
          />
        );
      case 'textarea':
        return (
          <TextField
            label={element.properties.label}
            placeholder={element.properties.placeholder}
            multiline
            rows={4}
            fullWidth
          />
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={<Checkbox checked={Boolean(element.properties.checked)} />}
            label={element.properties.label}
          />
        );
        
      case 'select':
        return (
          <FormControl fullWidth>
          <InputLabel>{element.properties.label}</InputLabel>
          <Select
            defaultValue=""
            label={element.properties.label}
          >
            {element.properties.options.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        );
      case 'radio':
        return (
          <RadioGroup
            row
          >
            {element.properties.options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        );
      case 'email':
        return (
          <TextField
            label={element.properties.label}
            placeholder={element.properties.placeholder}
            type="email"
            required={Boolean(element.properties.required)}
            fullWidth
          />
        );
      case 'phone':
        return (
          <TextField
            label={element.properties.label}
            placeholder={element.properties.placeholder}
            type="tel"
            required={Boolean(element.properties.required)}
            fullWidth
          />
        );
      case 'url':
        return (
          <TextField
            label={element.properties.label}
            placeholder={element.properties.placeholder}
            type="url"
            required={Boolean(element.properties.required)}
            fullWidth
          />
        );
      case 'date':
        return (
          <TextField
            label={element.properties.label}
            type="date"
            required={Boolean(element.properties.required)}
            fullWidth
            // inputlabelprops={{
            //   shrink: true,
            // }}
          />
        );
      case 'time':
        return (
          <TextField
            label={element.properties.label}
            type="time"
            required={Boolean(element.properties.required)}
            fullWidth
            inputlabelprops={{
              shrink: true,
            }}
          />
        );
      case 'button':
        return (
          <Button
            type="button"
            fullWidth
            inputlabelprops={{
              shrink: true,
            }}
            variant={element.properties.variant}
            color={element.properties.color}
            size={element.properties.size}
          >
            {element.properties.label}
          </Button>
        );
        case 'dateAndTime':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={element.properties.label}
              // renderInput={(props) => <TextField {...props} fullWidth />}
              value={element.properties.value || null}
              // onChange={(newValue) => {
              //   // Handle the change here
              //   console.log(newValue);
              // }}
              required={Boolean(element.properties.required)}
              format={element.properties.inputFormat || "yyyy/MM/dd HH:mm"}
              mask={element.properties.mask || "__/__/____ __:__"}
              minDateTime={element.properties.minDateTime}
              maxDateTime={element.properties.maxDateTime}
              disabled={Boolean(element.properties.disabled)}
              readOnly={Boolean(element.properties.readOnly)}
              slots={{
                textField: (params) => <TextField {...params} fullWidth />
              }}
            />
          </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          sx={{
            p: 1,
            border: isSelected ? '1px solid blue' : '',
            borderRadius: 1,
            bgcolor: 'background.paper',
            position: 'relative',
            width: '98%',
          }}
        >
          {renderElement()}
        </Box>
      )}
    </Draggable>
  );
};

export default FormElement;
