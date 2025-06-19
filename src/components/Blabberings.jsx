export default function Blabberings() {
    return (
        <div className="blabberings">
          <h2><span>Welcome!</span> You can use this app to <span>create</span>, <span>delete</span>, and <span>edit</span> notes.</h2>

          <p>Your notes are <strong>saved locally on your device,</strong> so they can only be viewed and accessed 
          by <strong>you or anyone using your machine.</strong></p>

          <p>This project uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" target="_blank">IndexedDB</a> 
          to store your data, which means you can close or refresh the page, and your notes will remain saved. 
          However, <strong>if you clear site data or uninstall the browser, your notes will be lost.</strong></p>
          
          <p>interested in a todo list version of this website? <a href="https://todo-todo-web-app.netlify.app/" target="_blank">check here!</a></p>

          <p className="credits">icons by <a href="https://www.svgrepo.com/" target="_blank">SVGrepo.</a> coded by <a href="https://github.com/tortaruga" target="_blank">tortaruga</a></p>
        </div>
    )
}