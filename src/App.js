import { useReducer, useState } from 'react';
import './App.css';

const ACTIONS = {
	ADD_TODO: 'add-todo',
	TOGGLE: 'toggle',
	DELETE: 'delete',
};

const reducer = (todos, action) => {
	switch (action.type) {
		case ACTIONS.ADD_TODO:
			return [...todos, newTodo(action.payload.name)];
		case ACTIONS.TOGGLE:
			return todos.map(todo => {
				if (todo.id === action.payload.id) {
					return { ...todo, complete: !todo.complete };
				}
				return todo;
			});
		case ACTIONS.DELETE:
			return todos.filter(todo => todo.id !== action.payload.id);
		default:
			return todos;
	}
};

const newTodo = name => {
	console.log(name);
	return { id: Date.now(), name: name, complete: false };
};

function App() {
	const [todos, dispatch] = useReducer(reducer, []);
	const [name, setName] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
		setName('');
	};

	console.log(todos);

	return (
		<div className='App bg-zinc-800 h-screen text-white transition-colors'>
			<div className=' '>
				<form
					className='form w-full flex justify-between'
					onSubmit={handleSubmit}
				>
					<input
						className='w-full bg-zinc-900 outline-none px-2 focus:bg-zinc-800'
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<button
						type='submit'
						className='bg-zinc-100 text-black px-6 py-3 hover:bg-zinc-200'
					>
						ADD
					</button>
				</form>
				<div className='flex flex-col gap-2'>
					{todos.map(todo => (
						<div
							className={`${
								todo.complete ? 'bg-gray-700' : 'bg-sky-800'
							} flex justify-between items-center`}
							key={todo.id}
						>
							<div className='flex flex-col font-mono'>
								<button
									className='bg-green-700 hover:bg-green-600 px-6 py-1'
									onClick={() =>
										dispatch({
											type: ACTIONS.TOGGLE,
											payload: { id: todo.id },
										})
									}
								>
									TOGGLE
								</button>
								<button
									className='bg-red-700 hover:bg-red-600 px-6 py-1'
									onClick={() =>
										dispatch({
											type: ACTIONS.DELETE,
											payload: { id: todo.id },
										})
									}
								>
									DELETE
								</button>
							</div>
							<p className='py-2 px-4 '>{todo.name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
