import React, { Component } from 'react'
import Axios from 'axios';

export default class Contact extends Component {
	constructor(props){
		super()
		this.state = {
			name: null,
			email: null,
			body: null,
			sent: false,
			item: false
		}
	}

	inputChange = e => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({[name]: value});
	}
	
	handleFormSubmit = async e => {
		e.preventdefault()
		if(this.state.name && this.state.email && this.state.body){
			let data = {
				name: this.state.name,
				email: this.state.email,
				body: this.state.body
			}
			Axios
				// ***************************** not sure about the route
				.post('http://localhost3001/contact', data)
				.then(res=> {
					this.setState({sent: true})
				})
				.catch(e=>{
					console.log(e.message)
				})
		}
	}

	render() {
		return(
			//main container
			<div>
				{/* //left container */}
				<div> 
					<div>
						<h2>Get In Touch</h2>
					</div>
					<div>
						<form>
							<label>Name:</label>
								<input type='text' name='name' onChange={this.inputChange} />
							<label>Email:</label>
								<input type='text' name='email' onChange={this.inputChange}/>
							<lable>Loooking for something special? Let us know!</lable>
								<textarea name='body' onChange={this.inputChange}/>
						</form>
					</div>
				</div>
				{/* right container */}
				<div>
					<img src='' alt='Stock'/>
					<h1>Questions? Ready to but?</h1>
					<p>Drops us a line.</p>
					<p>We will get back to you as soon as possible with an answer offering the best price</p>
					<p>(242)816-83683</p>
				</div>
			</div>
		) 
	}
}
