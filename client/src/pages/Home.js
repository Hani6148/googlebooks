import React, { Component } from "react";
import API from "../utile/API";
import { Input,Card } from 'semantic-ui-react'




class Home extends Component {

    

    state={
        value:"",
     books:[]
    }

    handleBookSave = id => {
        const book = this.state.books.find(book => book.id === id);
    
        API.saveBook({
          googleId: book.id,
          title: book.volumeInfo.title,
          
          link: book.volumeInfo.infoLink,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks.thumbnail
        }).then(() =>window.location.replace("/saved"));
      };




    searchBooks = (event,data) => {
        this.setState({value:data.value})
        console.log(data.value)
        API.getBooks(data.value)
        .then(res =>{
            console.log(res.data)
          this.setState({
            books: res.data
          })}
        )
     
        
    }

render(){
    

    return(
        <div>
        <Input onChange={this.searchBooks} focus placeholder='Search...' />
        <br/>
        <br/>
        <br/>

        <div className="row">
        {this.state.books.map(book => {
                  
                return(
                    
                    <div className="col-sm-4">
                    <Card
                    key={book.id}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    header={book.volumeInfo.title}
                    meta={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    extra={(<div>
                        <a href={book.volumeInfo.infoLink}>
                          Link to the book</a>
                          <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
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



export default Home;