
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {Homepage} from './pages/homepage';
import { WorkPage } from './pages/workpage';
import { UserPage } from './pages/userpage';
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<head>
				<meta charset="UTF-8"></meta>
				</head>
				<Routes>
					<Route path='/' element={<Homepage/>}/>
					<Route path='/userpage/:id' element={<UserPage/>}/>
					<Route path='/workpage' element={<WorkPage/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
