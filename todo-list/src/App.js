import React from 'react';
import './App.css';
import './index.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newItem : "",
      list : []
    };
  }

  //  Incorporating local storage 
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // When user leaves / refreshes the page 
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
      "beforeprint",
      this.saveStateToLocalStorage.bind(this)
    );  
    this.saveStateToLocalStorage();
  }
  hydrateStateWithLocalStorage() {
    // for all items in state 
    for (let key in this.state) {
      // if the key exists in localStorage 
      if(localStorage.hasOwnProperty(key) ) {
        //get the key's value from LocalStorage 
        let value = localStorage.getItem(key);

        // parse the localStograge and setState 
        try {
          value = JSON.parse(value);
          this.setState({
            [key] : value
          });
        } catch(e) {
          //handle empty string 
          this.setState({[key] : value})
        }
      }
    }
  }
  saveStateToLocalStorage() {
     // for every item in React state
     for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  updateInput(key,value){
    // update react state 
    this.setState({ [key] : value});
  }
  addItem() {
    // Create a new item with unique id
    const newItem = {
      id : 1 + Math.random(),
      value : this.state.newItem.slice()
    }
    //coppy current list of item 
    const list = [...this.state.list];

    // add the new Item to the lisst
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
    
  }
  deleteItem(id) {
    // copy current list of item 
    const list = [...this.state.list];

    // filter out the item being deleted 
    const updateList =  list.filter(item => item.id !== id);

    this.setState({ list : updateList});
  }
  render(){

    return (
      <div className="App">
       <h1 className="app-title">MY LIST</h1>
       <div className="container">
         <div style={{padding: 30,textAlign:"left",maxWidth: 500,margin: "auto"}}>
           Add an Item...
           <br/>
           <input 
              type="text"
              placeholder="Type item here"
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
           />
           <button 
              className="add-btn btn-floating"
              onClick= {() => this.addItem()}
              disabled={!this.state.newItem.length}
            >
               <i class="material-icons"> + </i>
            </button>
            <br/>
            <br/>
            <ul>
              {
                this.state.list.map(item => {
                  return(
                    <li key={item.id}>
                      {item.value} 
                      <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                        <i class="material-icons">x</i>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
         </div>
       </div>
      </div>
    );
  }
}

export default App;
