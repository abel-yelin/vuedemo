export default function registerPolyline(lf) {
  lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
    class ConnectionModel extends PolylineEdgeModel {
      constructor(data, graphModel) {
        super(data, graphModel)
      }
    }

    return {
      view: PolylineEdge,
      model: ConnectionModel,
    }
  })
}
