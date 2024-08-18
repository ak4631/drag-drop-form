import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Paper, Typography } from '@mui/material';

const toolboxItems = [
  { id: 'input', label: 'Input' },
  { id: 'textarea', label: 'Textarea' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'select', label: 'Select' },
  { id: 'radio', label: 'Radio Button' },
];

const Toolbox = () => {
  return (
    <Droppable droppableId="toolbox" isDropDisabled={true}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          elevation={3}
          sx={{ p: 2, minHeight: '300px' }}
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
