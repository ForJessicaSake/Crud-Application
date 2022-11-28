import "./App.css";
import { useState, useEffect } from "react";
import db from "./Firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

function App() {
  //The task state to keep track of the user's input
  const [taskInput, setTaskInput] = useState("");
  // creating a state for the task display functionality
  const [displayTask, setDisplayTask] = useState([]);

  //fetching data from the firestore database
  useEffect(
    () =>
      onSnapshot(collection(db, "task"), (snapshot) =>
        setDisplayTask(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    []
  );

  //The add task functionality

  const handleAddTask = async (e) => {
    /* To prevent the default submit on a html form tag*/
    e.preventDefault();

    try {
      const collectionRef = collection(db, "task");
      const payload = {
        task: taskInput,
        time: serverTimestamp(),
      };

      await addDoc(collectionRef, payload);

      console.log("task added");
    } catch (err) {
      alert("network error");
    }
  };

  const handleEdit = async (id) => {
    const task = prompt("enter your new task");
    const docRef = doc(db, "task", id);

    const payload = {
      task: task,
      time: serverTimestamp(),
    };
    await setDoc(docRef, payload);
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "task", id);
    await deleteDoc(docRef);
  };

  return (
    <main className="App">
      <h1>A Simple Crud Application</h1>
      {/* The read data functionality */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="enter your new task"
          value={taskInput}
          onChange={(e) => {
            setTaskInput(e.target.value);
          }}
        />
        <button>Add Task</button>
      </form>

      <section>
        {displayTask &&
          displayTask.map((task) => (
            <section key={task.id} className="task">
              <p>{task.task}</p>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </section>
          ))}
      </section>
    </main>
  );
}

export default App;
