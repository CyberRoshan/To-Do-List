import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dingSound from "./assets/iphone_ding.mp3";

function App() {
  let [todoName, settodoName] = useState("");
  let oldData = JSON.parse(localStorage.getItem("ToDoList")) ?? [];
  let [alltodo, setAlltodo] = useState(oldData);

  // ! Task completed Task Start
  let [doneTask, setdoneTask] = useState([]);
  let [allDoneTask, setallDoneTask] = useState("");
  // ! Task completed Task End
  let addToDo = (event) => {
    // console.log(todoName);
    if (todoName !== "") {
      let obj = {
        todoName,
        isCompleted: false,
      };
      let copyData = [...alltodo, obj];
      // console.log(copyData);
      localStorage.setItem("ToDoList", JSON.stringify(copyData));
      setAlltodo(copyData);
      toast("1 Task Added !");
      console.log(alltodo);
      settodoName("");
    } else {
      toast.error("Can't add empty task");
    }
    event.preventDefault();
  };

  const deleteRow = (indexNumber) => {
    let allItems = [...alltodo];
    allItems.splice(indexNumber, 1);
    toast.warning("1 Task Deleted !");
    localStorage.setItem("ToDoList", JSON.stringify(allItems));
    setAlltodo(allItems);
  };

  const taskCompleted = (indexNumber) => {
    let allItems = [...alltodo];
    const taskCompleted = allItems.splice(indexNumber, 1)[0];
    const audio = new Audio(dingSound);
    audio.play();
    toast.success("1 Task Completed !");
    localStorage.setItem("ToDoList", JSON.stringify(allItems));
    setAlltodo(allItems);

    // ! Task completed Task Start
    let completedTasks = () => {
      setallDoneTask([...allDoneTask, taskCompleted]); // [{...},{...},{...},{...}]
      // console.log(allDoneTask);

      let oldCompletedTask = [...allDoneTask];
      oldCompletedTask.push(taskCompleted);
      setdoneTask(oldCompletedTask);
    };

    completedTasks();
    // ! Task completed Task End
  };
  return (
    <>
      <section className="bg-[#212121] w-full ">
        <ToastContainer />
        <div className="max-w-[700px] mx-auto w-full min-h-screen">
          <h2 className="text-[#9E78CF]  text-center text-[40px] font-bold pt-10 pb-4">
            To Do List
          </h2>
          <form onSubmit={addToDo} class="py-6 flex gap-5">
            <input
              value={todoName}
              onChange={(event) => settodoName(event.target.value)}
              type="text"
              placeholder="Add a new task"
              id="default-input"
              class="bg-transparent border-2 text-[#777777] border-[#3E1671]  text-md rounded-2xl block w-full px-5 text-[18px] "
            />
            <button class="relative mt-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-purple-600 to-[#9E78CF] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white ">
              <span class="relative px-4 py-3 transition-all ease-in duration-75 bg-transparent ">
                <svg
                  className="w-6 h-6"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </span>
            </button>
          </form>

          <div className=" mt-10 space-y-3 ">
            <p className="text-white text-[20px] flex gap-3 mb-4">
              <svg
                className="w-6 h-auto "
                fill="#9E78CF"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>{" "}
              Task to do - {alltodo.length}
            </p>
            {alltodo.length >= 1 ? (
              alltodo.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#15101C] border border-[#9E78CF] p-4 flex justify-between rounded-xl shadow-2xl group"
                  >
                    <span className="text-white basis-[1%]">{index + 1}</span>
                    <p className="text-[#9E78CF] text-[17px] basis-[70%] group-hover:text-white">
                      {item.todoName}
                    </p>
                    <div className="flex gap-6">
                      <button onClick={() => taskCompleted(index)}>
                        <svg
                          className="w-7 h-auto"
                          fill="lightblue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path d="M96 80c0-26.5 21.5-48 48-48l288 0c26.5 0 48 21.5 48 48l0 304L96 384 96 80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48l16 0 0 128 448 0 0-128 16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48l0-96z" />
                        </svg>
                      </button>
                      <button onClick={() => deleteRow(index)}>
                        <svg
                          className="w-4 h-auto text-[] hover:text-[#3E1671]"
                          fill="#9E78CF"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-white text-center text-[24px] pt-20 font-semibold">
                Add Task to do...
              </div>
            )}
          </div>
          <div className="p-10 max-w-[700px] space-y-4 mt-14">
            <span className=" p-2 px-4 rounded-lg  bg-[#9851DE] text-white">
              {" "}
              Completed &nbsp; {doneTask.length}{" "}
            </span>
            {doneTask.length >= 1 ? (
              doneTask.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#15101C] border border-[#9E78CF] p-4 flex gap-14 rounded-xl shadow-2xl group"
                  >
                    <span className="text-white ">{index + 1}</span>
                    <p className="text-[#9E78CF] text-[17px] line-through group-hover:text-white">
                      {item.todoName}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-white text-center text-[24px] pt-20 font-semibold">
                No Task Completed...
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;