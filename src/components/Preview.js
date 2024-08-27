import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, Select, MenuItem, Radio, RadioGroup, FormControlLabel, TextField, Checkbox, FormControl, InputLabel } from '@mui/material';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';

const Preview = ({ open, onClose, elements, layout }) => {
  const renderElement = (element) => {
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
            inputlabelprops={{
              shrink: true,
            }}
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
