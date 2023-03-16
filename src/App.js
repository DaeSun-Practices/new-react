import {useState} from 'react';


/** Components */
function Header(props){
	return <header>
		<h1><a href="/" onClick={(event) => {
			event.preventDefault();
			props.onChangeMode();
		}}>{props.title}</a></h1>
	</header>
}

function Navigator(props){
	let topic_list = []

	props.topics.forEach(topic => {
		topic_list.push(
			<li key={topic.id}>
				<a id={topic.id} href={"/read/" + topic.id} onClick={(event) => {
					event.preventDefault();
					props.onChangeMode(event.target.id);
				}}>
					{topic.title}
				</a>
			</li>
		)
	});


	return <nav>
		<ol>
			{topic_list}
		</ol>
	</nav>
}

function Article(props){
	return <article>
		<h2>{props.title}</h2>
		{props.body}
	</article>
}

function Create(props){
	return <article>
		<h2>Create</h2>
		<form 
			onSubmit={event => {
				event.preventDefault();
				const title = event.target.title.value;
				const body = event.target.body.value;

				props.onCreate(title, body);
			}}
		
		>
			<p>
				<input type='text' name='title' placeholder='title'/>
			</p>

			<p>
				<textarea name='body' placeholder='body'/>
			</p>

			<p>
				<input type='submit'  value='Create'/>
			</p>
		</form>
	</article>
}

/** Main */
function App() {
	const [mode, setMode] = useState('WELCOME');
	const [id, setId] = useState(null);

	const [topics, setTopics] = useState([
		{id:1, title:'html', body:'html is ...'},
		{id:2, title:'css', body:'css is ...'},
		{id:3, title:'js', body:'js is ...'}
	]);


	let content = null;
	if (mode ==='WELCOME'){
		content = <Article title="Welcome" body="Hello, WEB"/>
	}
	else if (mode === 'READ'){
		let title, body = null;
		title = topics.filter(topic => topic.id === Number(id))[0].title;
		body = topics.filter(topic => topic.id === Number(id))[0].body;
		content = <Article title={title} body={body}/>
	}
	else if (mode === 'CREATE'){
		content = <Create 
			onCreate={(title, body) => {
				const new_topic = {id: topics.length+1 ,title: title, body: body}
				let new_topics = [...topics]
				new_topics.push(new_topic)
				setTopics(new_topics)
			}}
		/>
	}
	else if (mode === 'UPDATE'){
		content = <Create 
			onCreate={(title, body) => {
				const new_topic = {id: topics.length+1 ,title: title, body: body}
				let new_topics = [...topics]
				new_topics.push(new_topic)
				setTopics(new_topics)
			}}
		/>
	}


	return (
		<div>
			<Header title="WEB" onChangeMode={() => {setMode('WELCOME');}}/>

			<Navigator topics={topics}  
			
				onChangeMode={(id) => {
					setMode('READ');
					setId(id);	
				}}
			/>

			{content}
			
			<ul>
				<li>
					<a href='/create' 
						onClick={event => {
							event.preventDefault();
							setMode('CREATE');
						}}
					>
						Create
					</a>
				</li>
				
				<li>
					<a href={'/update' + String(id)} 
						onClick={event => {
							event.preventDefault();
							setMode('UPDATE');
						}}
					>
						Update
					</a>
				</li>
			</ul>
			
		</div>
	);
}

export default App;
