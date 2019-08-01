import React,{Component} from "react";
import { connect } from 'react-redux';


import * as actionTypes from "../../../../store/actions" 
import axios from "axios"




class Home extends Component {
  constructor(props) {
    super(props);

    
  }
 

componentDidMount(){
  

}

    render() { 
     


      return (
       <div>   
            <form method="post" action="/docx"enctype="multipart/form-data">
                <div>
                  <label for="file">Choose file to upload</label>
                  <input type="file" id="file"  name="avatar" multiple/>
                </div>
                <div>
                  <button>Submit</button>
                </div>
            </form>

         </div>   
                
      )}
  }


 



  const mapStateToProps = state => {
      
    return {
            productList:state.list.productList,
            providersList:state.list.providersList
    };
  };
 const mapDispatchToProps = dispatch => {
    return {

    };
};
  export default connect(mapStateToProps,mapDispatchToProps )(Home);


