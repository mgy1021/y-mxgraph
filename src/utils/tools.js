
import { mxGeometry, mxCell } from "../GraphModel/index"

export function addCell (graph, value, x, y, width, height, style, clientID) {
  if (!graph) return
  const cell = new mxCell(value, new mxGeometry(x, y, width, height), style);
  cell.vertex = true;
  if (clientID !== undefined) {
    cell.clientID = clientID;
  }
  return graph.importCells([cell]);
}

export function removeCell (graph, cellId) {
  if (!graph && !cellId) return
  const deletedCell = graph.getModel().getCell(cellId)
  if (deletedCell) {
    graph.removeCells([deletedCell]);
  }
}

export function updateCell (graph, cellId, value, x, y, width, height, style, clientID) {
  if (!graph && !cellId) return
  const cell = graph.getModel().getCell(cellId)
  if (cell) {
    cell.value = value
    cell.geometry.x = x
    cell.geometry.y = y
    cell.geometry.width = width
    cell.geometry.height = height
    cell.style = style
    if (clientID !== undefined) {
      cell.clientID = clientID
    }
    graph.refresh()
  }
}