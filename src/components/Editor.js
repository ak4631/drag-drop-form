import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FormElement from './FormElement';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Editor = ({ elements, layout, onElementClick, selectedElement, onLayoutChange, onDeleteElement }) => {
  const [containerWidth,setcontainerWidth] = useState(1200);
  useEffect(()=>{
    let width = document.getElementsByClassName("react-grid-layout")[0].offsetWidth;
    setcontainerWidth(width-50);
  },[])
  return (
    <Droppable droppableId="editor">
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          elevation={3}
          sx={{ p: 2, height: '1000px', overflowY: 'auto' }}
        >
          <Typography variant="h6" gutterBottom>
            Editor
          </Typography>
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={containerWidth}
            isResizable={true}
            isDraggable={true}
            onLayoutChange={onLayoutChange}
            style={{zIndex:"1",border:"2px solid black"}}
            // compactType={null}
            // preventCollision={true}
            useCSSTransforms={false}
          >
            {elements.map((element, index) => (
              <Box key={element.id} data-grid={layout.find(item => item.i === element.id)}  sx={{ zIndex: '10',width:"98%"}}>
                <FormElement
                  element={element}
                  index={index}
                  onClick={() => onElementClick(element)}
                  isSelected={selectedElement && selectedElement.id === element.id}
                />
                <IconButton
                  size="small"
                  style={{ position: 'absolute', top: 0, right: 0, zIndex: 99 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteElement(element.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </GridLayout>
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};

export default Editor;
