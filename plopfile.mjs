import curdGenerator from './plop-template/curd/prompt.mjs'

const plopfile = (plop) => {
  plop.setGenerator('curd', curdGenerator)
}
export default plopfile
