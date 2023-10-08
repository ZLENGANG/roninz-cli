import { makeList, makeInput, getLatestVersion } from "@roninz/utils";
import { homedir } from 'node:os'
import path from "node:path";

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const ADD_TYPE = [
  {
    name: "项目",
    value: ADD_TYPE_PROJECT
  },
  {
    name: "页面",
    value: ADD_TYPE_PAGE
  }
]
const ADD_TEMPLATE = [
  {
    name: "vue2-template",
    value: "vue2",
    npmName: "roninz-vue2-template",
    version: "0.0.0"
  },
  {
    name: "vue3-template",
    value: "vue3",
    npmName: "roninz-vue3-template",
    version: "0.0.0"
  }
]
const TEMP_HOME = '.roninz-cli';


// 获取创建类型
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: '请选择初始化类型',
    defaultValue: ADD_TYPE_PROJECT,
  })
}

// 获取创建名字
function getAddName() {
  return makeInput({
    message: "请输入项目名称",
    defaultValue: '',
    validate: (v) => {
      if (v.length > 0) return true
      return '请输入项目名称'
    }
  })
}

// 选择项目模板
function getAddTemp() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择模板',
  })
}

// 安装缓存目录
function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate');
}

export default async function createTemp(name, opts) {
  console.log(opts);
  const { type, template } = opts

  let addType = type || await getAddType()
  let selectedTemplate = null

  if (addType === ADD_TYPE_PROJECT) {
    let addName = name || await getAddName()
    if (template) {
      selectedTemplate = ADD_TEMPLATE.find(item => item.value === template)
      if (!selectedTemplate) {
        throw new Error(`项目模板 ${template} 不存在！`);
      }
    } else {
      const temp = await getAddTemp()
      selectedTemplate = ADD_TEMPLATE.find(item => item.value === temp)
    }

    // 获取最新版本号
    const latestVersion = await getLatestVersion(selectedTemplate.npmName)
    selectedTemplate.version = latestVersion

    const targetPath = makeTargetPath();

    return {
      type: addType,
      name: addName,
      template: selectedTemplate,
      targetPath,
    }
  } else {
    throw new Error(`创建的类型${addType}暂不支持！`)
  }
}