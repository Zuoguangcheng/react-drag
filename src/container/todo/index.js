import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { Resizable } from 're-resizable';

import Content from './content';

import './index.css';

export default function Index() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
          <div style={{display: 'flex'}}>
              <Resizable
                  defaultSize={{
                      width:320,
                      height:400,
                  }}
                  style={{
                      margin: '20px'
                  }}
              >
                  <Content type="from"/>
              </Resizable>

              <Resizable
                  defaultSize={{
                      width:320,
                      height:400,
                  }}
                  style={{
                      margin: '20px'
                  }}
              >
                  <Content type="to"/>
              </Resizable>
          </div>
      </DndProvider>
    </div>
  )
}