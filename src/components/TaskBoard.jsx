import AddUpdateTask from "./AddUpdateTask"
import TaskAction from "./TaskAction"
import TaskList from "./TaskList"

import { useState } from "react"
import { useTaskContext, useTaskDispatch } from "../context/TaskContext.jsx"

const TaskBoard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [taskToUpdate, setTaskToUpdate] = useState("")

	const tasks = useTaskContext()
	const dispatch = useTaskDispatch()

	const handleOnClose = () => {
		setIsModalOpen(false)
	}

	// Handle Edit Task
	const handleEditTask = (task) => {
		setTaskToUpdate(task)
		setIsModalOpen(true)
	}

	return (
		<section className="mb-20" id="tasks">
			{isModalOpen && (
				<AddUpdateTask
					onClose={handleOnClose}
					taskToUpdate={taskToUpdate}
				/>
			)}
			<div className="container mx-auto">
				<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskAction onTaskAdd={() => setIsModalOpen(true)} />
					<div className="overflow-auto">
						<table className="table-fixed overflow-auto xl:w-full">
							<thead>
								<tr>
									<th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
									<th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
										Title
									</th>
									<th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
										Description
									</th>
									<th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
										Tags
									</th>
									<th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
										Priority
									</th>
									<th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
										Options
									</th>
								</tr>
							</thead>
							<tbody>
								{tasks.map((task) => (
									<TaskList
										key={task.id}
										task={task}
										onEdit={handleEditTask}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TaskBoard
