import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Paper, Typography } from '@mui/material';

const toolboxItems = [
  { id: 'input', label: 'Input', properties: { label: 'Input', placeholder: '', required: false } },
  { id: 'textarea', label: 'Textarea', properties: { label: 'Textarea', placeholder: '', required: false } },
  { id: 'checkbox', label: 'Checkbox', properties: { label: 'Checkbox', checked: false } },
  { id: 'select', label: 'Select', properties: { label: 'Select', options: ['Option 1', 'Option 2'], required: false } },
  { id: 'radio', label: 'Radio Button', properties: { label: 'Radio Button', options: ['Option 1', 'Option 2'], required: false } },
  { id: 'email', label: 'Email', properties: { label: 'Email', placeholder: '', required: false } },
  { id: 'phone', label: 'Phone', properties: { label: 'Phone', placeholder: '', required: false } },
  { id: 'url', label: 'URL', properties: { label: 'URL', placeholder: '', required: false } },
  { id: 'date', label: 'Date', properties: { label: 'Date', required: false } },
  { id: 'dateAndTime', label: 'Date And Time', properties: { label: 'Date and Time',required: false,value: null,inputFormat: "yyyy/MM/dd HH:mm",mask: "__/__/____ __:__",minDateTime: null,maxDateTime: null,disabled: false,readOnly: false,
   } },
  { id: 'time', label: 'Time', properties: { label: 'Time', required: false } },
  { id: 'button', label: 'Button', properties: { label: 'Button', variant: 'contained',color:'success' } },
];

const Toolbox = () => {
  return (
    <Droppable droppableId="toolbox" isDropDisabled={true}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          elevation={3}
          sx={{ p: 2, minHeight: '300px', maxHeight: '80vh', overflowY: 'auto' }}
        >
          <Typography variant="h6" gutterBottom>
            Toolbox
          </Typography>
          {toolboxItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{
                    p: 1,
                    my: 1,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                  }}
                >
                  {item.label}
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};

export default Toolbox;
