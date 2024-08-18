import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Box, TextField, Checkbox, FormControlLabel, Select, MenuItem, Radio, RadioGroup } from '@mui/material';

const FormElement = ({ element, index, onClick, isSelected }) => {
  const renderElement = () => {
    switch (element.type) {
      case 'input':
        return (
          <TextField
            label={element.properties.label}
            placeholder={element.properties.placeholder}
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
            control={<Checkbox checked={element.properties.checked} />}
            label={element.properties.label}
          />
        );
      case 'select':
        return (
          <Select
            label={element.properties.label}
            fullWidth
          >
            {element.properties.options.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        );
      case 'radio':
        return (
          <RadioGroup>
            {element.properties.options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
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
            border: isSelected ? '2px solid blue' : '1px solid #ccc',
            borderRadius: 1,
            bgcolor: 'background.paper',
            position: 'relative',
            height: '100%',
            // '& .react-resizable-handle': {
            //   pointerEvents: 'none',
            // },
          }}
        >
          {renderElement()}
        </Box>
      )}
    </Draggable>
  );
};

export default FormElement;

