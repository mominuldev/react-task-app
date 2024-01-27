import { createContext, useContext, useReducer, useState } from "react"
import { InitialTasks } from "../data/tasks"
import TaskReducers from "../reducers/TaskReducers"

const TaskContext = createContext(null)
const TaskContextDispatch = createContext(null)

const TaskContextProvider = ({ children }) => {
	const [tasks, dispatch] = useReducer(TaskReducers, InitialTasks)

	return (
		<TaskContext.Provider value={tasks}>
			<TaskContextDispatch.Provider value={dispatch}>
				{children}
			</TaskContextDispatch.Provider>
		</TaskContext.Provider>
	)
}

export default TaskContextProvider

export const useTaskContext = () => {
	const tasks = useContext(TaskContext)
	if (tasks === undefined) {
		throw new Error(
			"useTaskContext must be used within a TaskContextProvider"
		)
	}

	return tasks
}

export const useTaskDispatch = () => {
	const setTasks = useContext(TaskContextDispatch)

	if (setTasks === undefined) {
		throw new Error(
			"useTaskDispatch must be used within a TaskContextProvider"
		)
	}

	return setTasks
}
