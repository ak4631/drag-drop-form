import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, Select, MenuItem, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Preview = ({ open, onClose, elements, layout }) => {
  const renderElement = (element) => {
    switch (element.type) {
      case 'input':
        return (
          <input
            type="text"
            placeholder={element.properties.placeholder}
            style={{ width: '100%' }}
          />
        );
      case 'textarea':
        return (
          <textarea
            placeholder={element.properties.placeholder}
            style={{ width: '100%', height: '100%' }}
          />
        );
      case 'checkbox':
        return (
          <label>
            <input type="checkbox" />
            {element.properties.label}
          </label>
        );
      case 'select':
        return (
          <Select style={{ width: '100%' }}>
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

  // ... (keep the rest of the component unchanged)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Form Preview</DialogTitle>
      <DialogContent>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={800}
          isResizable={false}
          isDraggable={false}
        >
          {elements.map((element) => (
            <Box key={element.id}>
              {renderElement(element)}
            </Box>
          ))}
        </GridLayout>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          Close Preview
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
