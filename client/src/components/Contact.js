import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap'

class Contact extends Component {
  render() {
    return(
      <ListGroupItem>
        <div className="contact-img"><img src={this.props.avatar} alt={this.props.name} /></div>
        <div className="contact-name">{this.props.name}</div>
        <div className="contact-phone">{this.props.phone}</div>
        <div className="contact-email">{this.props.email}</div>
      </ListGroupItem>
    )
  }
}

export default Contact;