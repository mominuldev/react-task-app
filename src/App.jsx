import Header from "./components/Header"
import Banner from "./components/Banner"
import TaskBoard from "./components/TaskBoard"
import Footer from "./components/Footer"
import TaskContextProvider from "./context/TaskContext"

function App() {
	return (
		<>
			<Header />
			<Banner />
			<TaskContextProvider>
				<TaskBoard />
			</TaskContextProvider>
			<Footer />
		</>
	)
}

export default App
