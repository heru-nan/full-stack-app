import {addNewTask, updateTask} from './server';



(async function myf(){
    await addNewTask({
        name: "myTask",
        id:"1234",
    })
    await updateTask({
        id:"1234",
        name: "my task UPDATED!!!!"
    })
})();   