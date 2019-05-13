interface Config {
  padding: number
  stroke: string
  font: string
  title: string
  leading: number
  fontSize: number
  lineWidth: number
  gutter: number
  styles: { [key: string]: Style }
  fill: string[]
  edges: string
  edgeMargin: number
  spacing: number
  direction: 'TB'|'LR'
  fillArrows: boolean
  arrowSize: number
  bendSize: number
  zoom: number
}

interface Measurer {
    setFont(config: Config, isBold: 'bold'|'normal', isItalic:'italic'|'normal'): void
    textWidth(text: string): number
    textHeight(): number
}

type HullType = 'icon'|'empty'|'auto'

class Style {
  bold: boolean = true
  underline: boolean = false
  italic: boolean = false
  dashed: boolean = false
  empty: boolean = false
  center: boolean = false
  fill: string|undefined = undefined
  stroke: string|undefined = undefined
  visual: string = 'class'
  direction: 'TB'|'LR' = 'TB'
  hull: HullType = 'auto'
  constructor(conf: { stroke: string }) {
    this.stroke = conf.stroke
  }
}

interface Visualizer {
  (node: Classifier, x: number, y: number, config: Config, g: Graphics): void
}

class Compartment {
  width: number
  height: number
  nodes: Array<Classifier>
  constructor(
    public lines: string[], 
    public uniqClassifiers: Classifier[], 
    public relations: Relation[]
  ){}
}

class Relation {
  id: number
  path?: Vector[]
  start: string
  end: string
  startLabel: string
  endLabel: string
  assoc: string
}

class Classifier {
  name: string
  x: number
  y: number
  width: number
  height: number
  layoutWidth: number
  layoutHeight: number
  constructor(
    public type: string,
    public id: string,
    public compartments: Compartment[]
  ){}
}