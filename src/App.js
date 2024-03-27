import React, { useEffect, useRef, useState } from 'react';
import { mxGraph } from "./GraphModel/index";
import { Button } from 'antd';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { mxGraphBinding } from "./mxGraphBinding";
import { addCell, removeCell } from "./utils/tools"

function App () {
  const [graph, setGraph] = useState(null);
  const [yCellsMap, setYCellsMap] = useState(null);
  const [ydoc, setYdoc] = useState(null);
  const container = useRef(null);

  useEffect(() => {
    if (!graph) {
      const doc = new Y.Doc();
      const yCellsMap = doc.getMap('graph');
      const _graph = createGraph(container.current);
      const wsProvider = new WebsocketProvider(
        'ws://localhost:1234',
        'y-mxgraph-example2',
        doc
      );
      wsProvider.on('status', (event) => {
        console.log(event.status);
      });

      setGraph(_graph);
      setYCellsMap(yCellsMap);
      setYdoc(doc);
    }
  }, []);

  useEffect(() => {
    if (graph && yCellsMap && ydoc) {
      const binding = new mxGraphBinding(yCellsMap, graph)
      return () => {
        binding.destroy();
      }
    }
  }, [graph, yCellsMap, ydoc]);

  function createGraph (el) {
    const graph = new mxGraph(el);
    return graph;
  }

  function addNodeHandler (graph) {
    addCell(graph, "Holle", 100, 100, 100, 100, "shape=ellipse;fillColor=#f4ffb8;fontColor=#3f6600;strokeColor=#a0d911;strokeWidth=2")
  }

  function getAllYmayNodes () {
    console.log(yCellsMap.toJSON());
    // yCellsMap.set('123', { id: '123', value: '123' });
  }

  function deleteNodesHandler () {
    const cells = graph.getSelectionCells();
    removeCell(graph, cells[0].id);
  }

  return (
    <div className="App">
      <div className='w-full h-svh flex justify-center items-center flex-wrap'>
        <div className=' w-3/4'>
          <Button className='mr-2' onClick={() => addNodeHandler(graph)}>Add Node</Button>
          <Button className='mr-2' onClick={getAllYmayNodes}>getAllNodes</Button>
          <Button className='mr-2' onClick={deleteNodesHandler}>deleteNodes</Button>
        </div>
        <div ref={container} className=' w-3/4 h-[600px] bg-gray-200'></div>
      </div>
    </div>
  );
}

export default App;
