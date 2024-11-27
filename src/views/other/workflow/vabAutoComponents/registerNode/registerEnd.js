export default function registerEnd(lf) {
  lf.register('end', ({ CircleNode, CircleNodeModel, h }) => {
    class EndNode extends CircleNode {
      getIconShape() {
        const { x, y } = this.props.model
        return h(
          'text',
          {
            fill: 'var(--el-color-grey)',
            fontSize: 12,
            x: x - 12,
            y: y + 4,
            width: 50,
            height: 25,
          },
          '结束'
        )
      }

      getShape() {
        const { model } = this.props
        const { x, y } = model
        const style = model.getNodeStyle()
        return h('g', {}, [
          h('circle', {
            ...style,
            cx: x,
            cy: y,
          }),
          this.getIconShape(),
        ])
      }
    }

    class EndModel extends CircleNodeModel {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '',
          x: data.x,
          y: data.y + 35,
        }
        super(data, graphModel)
      }

      getConnectedSourceRules() {
        const rules = super.getConnectedSourceRules()
        const notAsTarget = {
          message: '终止节点不能作为连线的起点',
          validate: () => false,
        }
        rules.push(notAsTarget)
        return rules
      }
    }

    return {
      view: EndNode,
      model: EndModel,
    }
  })
}
