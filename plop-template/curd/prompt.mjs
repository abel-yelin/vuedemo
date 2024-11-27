const notEmpty = (name) => {
  return (v) => {
    if (!v || v.trim === '') return `${name}为必填项`
    else return true
  }
}

const templateName = 'goods'

export default {
  description: '创建curd',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入view名称，然后点击回车，view名称必须为单个英文，且不能有特殊字符，如：中文、空格、特殊符号等',
      validate: notEmpty('name'),
    },
  ],
  actions: () => {
    const properCaseName = '{{ properCase name }}'
    const camelCaseName = '{{ camelCase name }}'
    return [
      {
        type: 'add',
        path: `src/views/${templateName}/${properCaseName}.vue`,
        templateFile: './plop-template/curd/index.hbs',
      },
      {
        type: 'add',
        path: `src/views/${templateName}/vabAutoComponents/${properCaseName}Edit.vue`,
        templateFile: './plop-template/curd/edit.hbs',
      },
      {
        type: 'add',
        path: `mock/controller/${camelCaseName}.ts`,
        templateFile: './plop-template/curd/mock.hbs',
      },
      {
        type: 'add',
        path: `src/api/${camelCaseName}.ts`,
        templateFile: './plop-template/curd/api.hbs',
      },
    ]
  },
}
