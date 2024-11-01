import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import ToDoItems from "./ToDoItems";

const ToDo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []);
  const inputRef = useRef();

  // fungsi menambah To Do
  const add = () => {
    const inputText = inputRef.current.value.trim();
    
    if (inputText === "") {
      return null;
    }

    const newToDo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newToDo]);
    inputRef.current.value = "";
  };

  // fungsi menghapus To Do
  const deleteToDo = (id) => {
    setTodoList((prevToDo) => 
      prevToDo.filter((todo) => todo.id !== id)
    );
  }

  // fungsi menandai To Do sebagai selesai
  const toggle = (id) => {
    setTodoList((prevToDo) =>{
      return prevToDo.map((todo) => {
        if (todo.id === id) {
          // kalau true bakal dibuat false kalau false bakal dibuat true
          return {...todo, isComplete: !todo.isComplete}; 
        }
        return todo;
      })
    })
  }

  // Menyimpan data ke local storage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);
  
  // Halaman Utama
  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      
      {/* title */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="To Do Icon"></img>
        <h1 className="text-3xl font-semibold">My To Do List</h1>
      </div>
      <h3>By Farhan Hanif Rahmansyah</h3>

      {/* input tugas */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Masukan Tugas Anda Disini!"
        ></input>
        <button onClick={add} className="border-none rounded-full bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer">
          Tambah +
        </button>
      </div>

      {/* list tugas */}
      <div>
        {todoList.map((item, index) => (
          <ToDoItems key={index} text={item.text} id={item.id}
          isComplete={item.isComplete} deleteToDo={deleteToDo} toggle={toggle} />
        ))}
      </div>
    </div>
  );
};

export default ToDo;