const db = require('./db.js')
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

module.exports.add = async (title) => {
    let list = await db.read()
    list.push({ title, done: false })
    await db.write(list)
}
module.exports.clear = async () => {
    await db.write([])
    //async默认返回的也是一个promise
}

function askForTitle(list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'newTitle',
        message: "新标题是什么",
        default: list[index].title

    }).then(answer3 => {
        list[index].title = answer3.newTitle
        db.write(list)
    }
    )
}
function markAsDown(list, index) {
    list[index].done = true;
    db.write(list);
}
function markAsUnDown(list, index) {
    list[index].done = false;
    db.write(list);
}
function removeTask(list, index) {
    console.log('执行删除了吗');
    console.log(index);

    list.splice([index], 1)
    db.write(list)
}
function askForAction(list, index) {
    const actions = {
        askForTitle, markAsDown, markAsUnDown, removeTask
    }
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '你要进行什么操作?',
        choices: [{ name: '退出', value: 'quit' }, { name: '完成', value: 'markAsDown' }, {
            name: '标为未完成', value:
                'markAsUnDown'
        }, { name: '修改标题', value: 'askForTitle' }, { name: '删除', value: 'removeTask' }
        ]
    })
        .then(async (answer2) => {
            let actionNow = actions[answer2.action]
            actionNow && actionNow(list, index)
        })
}
function askForCreateTask(list) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: "输入新任务的标题",
    }).then((answer4) => {
        list.push({ title: answer4.title, done: false })
        db.write(list)
    })
}

function printTasks(list) {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择你要操作的任务?',
                choices: [{ name: '退出', value: -1 }, { name: '+ 创建任务', value: -2 }, ...list.map((item, index) => {
                    return { name: `${item.done ? '[D]' : '[U]'}${index + 1} - ${item.title}`, value: index }

                })]
            }]
        )
        .then((answer) => {
            if (answer.index >= 0) {
                askForAction(list, answer.index)
            } else if (answer.index === -2) {
                askForCreateTask(list)
            }

        }
        );
}

module.exports.showAll = async () => {
    let list = await db.read()
    console.log(list);

    printTasks(list)
}





