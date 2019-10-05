import React, { Component } from "react";
import API from "../utile/API";
import { Input,Card } from 'semantic-ui-react'




class Saved extends Component {

    
    state = {
        books: []
      };
    
      componentDidMount() {
        this.getSavedBooks();
      }
    
      getSavedBooks = () => {
        API.getSavedBooks()
          .then(res =>
            this.setState({
              books: res.data
            })
          )
          .catch(err => console.log(err));
      };
    
      handleBookDelete = id => {
        API.deleteBook(id).then(res => this.getSavedBooks());
      };

render(){
    

    return(
        <div>
        
        <br/>
        <br/>
        <br/>

        <div className="row">
        {this.state.books.map(book => {
                  
                return(
                    
                    <div className="col-sm-4">
                    <Card
                    key={book.id}
                    image={book.image}
                    header={book.title}
                    meta={book.authors.join(", ")}
                    description={book.description}
                    extra={(<div>
                        <a href={book.link}>
                          Link to the book</a>
                          <button
                          onClick={() => this.handleBookDelete(book._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                        </div>
                      )}
                    
                    />
                    </div>
                    
                )
                
        })}
        
        </div>

       </div>
        
    )
} 




}



export default Saved;