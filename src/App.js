import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [value, setValue] = useState(null)
  const [ message, setMessage] = useState(null)
  const [ previousChats, setPreviousChats] = useState([])
  const [ currentTitle, setCurrentTitle] = useState (null)

  
  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      getMessages();
    }
  }

  const getMessages = async () => {
    
    if (value.trim() === "") {
      return; // If the input value is empty or contains only whitespace, return without making the API call
    }
  

    const options = {
      method: "POST",
      body: JSON.stringify({
      message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)

    }
    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  
    setValue(""); // Clear the input value after the API call
  
    
  }

   useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats =>(
        [...prevChats, 
          {
            title: currentTitle,
            role: "USER",
            content: value
        }, 
        {
            title: currentTitle,
            role: "J.A.R.V.I.S",
            content: message.content

        }
      ]

      ))
    }
}, [message, currentTitle])

console.log(previousChats)

const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
const uniqueTitles =  Array.from (new Set(previousChats.map(previousChat => previousChat.title)))
console.log(uniqueTitles)




  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}> + New Chat </button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li
              key={index}
              onClick={() => handleClick(uniqueTitle)}
              className={`title ${uniqueTitle === currentTitle ? 'active' : ''}`}
            >
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <span className="font1">CODED WITH </span><span className="heart">♥</span><span className="font1"> BY </span><span className="font2">NAVEEN</span>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && (
  <div className="centered-content">
  {!currentTitle && (
    <div>
      <h1 className="name">J.A.R.V.I.S</h1>
      <p>I have taken up the mantle in honor of Tony Stark</p>
      <div className="grid">
          <div className="grid-item">
          <FontAwesomeIcon icon={ faSun } />
         
            <p>Examples</p>
          </div>
          <div className="grid-item">
          <FontAwesomeIcon icon={ faBolt } />
         
            <p>Capabilities</p>
          </div>
          <div className="grid-item">
          <FontAwesomeIcon icon={ faTriangleExclamation } />
          
            <p>Limitations</p>
          </div>
          <div className="grid-item">
            <p className="e1">"How does the human brain process and store memories?"</p>
          </div>
          <div className="grid-item">
            <p className="c1">Remembers what the user said earlier in the conversation</p>
          </div>
          <div className="grid-item">
            <p className="l1">Limited knowledge of the world and events after the year 2021</p>
          </div>
          <div className="grid-item">
            <p className="e2">"What are the ethical implications of artificial 
            intelligence?"</p>
          </div>
          <div className="grid-item">
            <p className="c2">Allows the user to provide follow-up corrections</p>
          </div>
          <div className="grid-item">
            <p className="l2">May sometime produce harmful instructions or biased content</p>
          </div>
          <div className="grid-item">
            <p className="e3">"Can you explain the concept of quantum computing?"</p>
          </div>
          <div className="grid-item">
            <p className="c3">Trained to decline inappropriate requests</p>
          </div>
          <div className="grid-item">
            <p className="l3">May sometime generate incorrect information</p>
          </div>
        </div>
    </div>
  )}
</div>
)}
    
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>

        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Send a message." className="input-field"/>
            <div id="submit" onClick={getMessages}>
            <span className="arrow">➢</span>
            </div>
          </div> 
          <p className="info">
          An AI language model designed to provide human-like text responses and assist users with various tasks and inquiries.
          </p>
        </div> 
      </section>
    </div>
  )
}

export default App

