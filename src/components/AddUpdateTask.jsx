import { useState } from "react"
import { useTaskContext, useTaskDispatch } from "../context/TaskContext"
import { getNextId } from "../utils/getNextId"

const AddUpdateTask = ({ onClose, taskToUpdate }) => {
	const tasks = useTaskContext()
	const dispatch = useTaskDispatch()

	const [task, setTask] = useState(
		taskToUpdate || {
			id: getNextId(tasks),
			title: "",
			description: "",
			tags: "",
			priority: "",
			isFavorite: false,
		}
	)

	const isAdd = Object.is(taskToUpdate, null)

	const handleOnChange = (e) => {
		const name = e.target.name
		let value = e.target.value

		if (name === "tags") {
			value = value.split(",") // Split the value of 'tags' variable into an array
		}

		setTask({
			...task,
			[name]: value,
		})
	}

	// Add new task
	const handleOnSave = (newTask, isAdd) => {
		if (isAdd) {
			dispatch({
				type: "ADD_TASK",
				task: newTask,
			})
		} else {
			dispatch({
				type: "UPDATE_TASK",
				task: newTask,
			})
		}

		onClose()
	}

	return (
		<div className="h-full w-full fixes top-0 left-0">
			<div className="h-screen w-full fixed top-0 left-0 bg-black opacity-80 z-70"></div>
			<form className="mx-auto w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] z-20 p-9 max-md:px-4 lg:p-9 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
				<h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
					{isAdd ? "Add New Task" : "Update Task"}
				</h2>

				<div className="space-y-9 text-white lg:space-y-10">
					<div className="space-y-2 lg:space-y-3">
						<label htmlFor="title">Title</label>
						<input
							className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
							type="text"
							name="title"
							id="title"
							value={task.title}
							onChange={handleOnChange}
							required
						/>
					</div>

					<div className="space-y-2 lg:space-y-3">
						<label htmlFor="description">Description</label>
						<textarea
							className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
							type="text"
							name="description"
							id="description"
							value={task.description}
							onChange={handleOnChange}
							required
						></textarea>
					</div>

					<div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
						<div className="space-y-2 lg:space-y-3">
							<label htmlFor="tags">Tags</label>
							<input
								className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
								type="text"
								name="tags"
								id="tags"
								value={task.tags}
								onChange={handleOnChange}
								required
							/>
						</div>

						<div className="space-y-2 lg:space-y-3">
							<label htmlFor="priority">Priority</label>
							<select
								className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
								name="priority"
								id="priority"
								value={task.priority}
								onChange={handleOnChange}
								required
							>
								<option value="">Select Priority</option>
								<option value="Low">Low</option>
								<option value="Medium">Medium</option>
								<option value="High">High</option>
							</select>
						</div>
					</div>
				</div>

				<div className="mt-16 flex justify-center gap-3 lg:mt-20">
					<button
						className="rounded bg-gray-600 px-4 py-2 text-white transition-all hover:opacity-80"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						type="button"
						className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
						onClick={() => handleOnSave(task)}
					>
						{isAdd ? "Add" : "Update"}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddUpdateTask
