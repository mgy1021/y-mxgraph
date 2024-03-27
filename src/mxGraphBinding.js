import { mxEvent } from './GraphModel/index';
import { addCell, removeCell, updateCell } from './utils/tools';

export class mxGraphBinding {
  constructor(ymap, graph) {
    this.graph = graph; // mxGraph instance
    this.ymap = ymap; // Y.Map instance
    this.doc = ymap.doc; // Y.Doc instance

    // 用于标识自己的客户端的操作
    const clientID = this.doc.clientID;
    console.log('My client ID: ' + clientID);

    this.cellAddedListener = function (sender, evt) {
      const cells = evt.getProperty('cells');
      const obj = { value: cells[0].value, x: cells[0].geometry.x, y: cells[0].geometry.y, width: cells[0].geometry.width, height: cells[0].geometry.height, style: cells[0].style, clientID: cells[0].clientID }
      if (obj.clientID == undefined || obj.clientID == clientID) {
        obj.clientID = clientID;
        ymap.set(cells[0].id, obj);
      }
    }

    this._ymapObserver = (event, trans) => {
      // console.log(event, trans, 'event');
      for (let key of event.keysChanged) {
        if (ymap.has(key)) {
          let obj = ymap.get(key);
          if (obj.clientID != clientID) {
            console.log(event.changes.keys.get(key).action, 'changeType');
            const actionType = event.changes.keys.get(key).action
            switch (actionType) {
              case 'add':
                addCell(graph, obj.value, obj.x, obj.y, obj.width, obj.height, obj.style, obj.clientID)
                break;
              case 'update':
                updateCell(graph, key, obj.value, obj.x, obj.y, obj.width, obj.height, obj.style, obj.clientID)
                break;
              default:
                break;
            }
          }
        } else {
          removeCell(graph, key)
        };
      }
    }

    this.ymap.observe(this._ymapObserver);
    graph.addListener(mxEvent.CELLS_ADDED, this.cellAddedListener);
    graph.addListener(mxEvent.CELLS_MOVED, (sender, evt) => {
      const cells = evt.getProperty('cells');
      const obj = { value: cells[0].value, x: cells[0].geometry.x, y: cells[0].geometry.y, width: cells[0].geometry.width, height: cells[0].geometry.height, style: cells[0].style, clientID: undefined }
      if (obj.clientID == undefined || obj.clientID == clientID) {
        obj.clientID = clientID;
        ymap.set(cells[0].id, obj);
      }
      // ymap.set(cells[0].id, obj);
      console.log('cells moved', cells);
    })
    graph.addListener(mxEvent.CELLS_REMOVED, (sender, evt) => {
      const cells = evt.getProperty('cells');
      ymap.delete(cells[0].id);
    })
  }

  destroy () {
    this.graph.removeListener(mxEvent.CELLS_ADDED, this.cellAddedListener);
    this.ymap.unobserve(this._ymapObserver);
  }
}     