const TaskReducers = (state, action) => {
	switch (action.type) {
		case "ADD_TASK":
			return [...state, action.task]
		case "UPDATE_TASK":
			return state.map((task) =>
				task.id === action.task.id ? action.task : task
			)
		case "DELETE_TASK":
			return state.filter((task) => task.id !== action.payload)
		case "TOGGLE_FAVORITE":
			return state.map((task) =>
				task.id === action.payload
					? { ...task, favorite: !task.favorite }
					: task
			)
		default:
			return state
	}
}

export default TaskReducers
