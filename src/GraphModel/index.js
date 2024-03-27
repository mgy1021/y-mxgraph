const mx = require('mxgraph');

const mxgraph = mx({})

const mxGraph = mxgraph.mxGraph;
const mxGraphModel = mxgraph.mxGraphModel;
const mxCell = mxgraph.mxCell;
const mxGeometry = mxgraph.mxGeometry;
const mxConstants = mxgraph.mxConstants;
const mxEvent = mxgraph.mxEvent;
const mxCodec = mxgraph.mxCodec;
const mxShape = mxgraph.mxShape;
const mxCellRenderer = mxgraph.mxCellRenderer;


window.mxGraph = mxGraph;
window.mxGraphModel = mxGraphModel;
window.mxCell = mxCell;
window.mxGeometry = mxGeometry;
window.mxConstants = mxConstants;
window.mxEvent = mxEvent;
window.mxCodec = mxCodec;
window.mxShape = mxShape;
window.mxCellRenderer = mxCellRenderer;


module.exports = {
  mxGraph,
  mxGraphModel,
  mxCell,
  mxGeometry,
  mxConstants,
  mxEvent,
  mxCodec,
  mxShape,
  mxCellRenderer
};  