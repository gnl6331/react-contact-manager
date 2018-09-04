import React, { Component } from 'react';
import uuid from 'uuid';
import { Container, ListGroup,ListGroupItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Form } from 'reactstrap'

class ContactList extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      contacts: [
        {
          id: uuid(),
          name: 'Klaas de Groot',
          phone: '+31 6 87 98 24 15',
          email: 'klaasdegroot@gmail.com',
          avatar: 'https://media.licdn.com/dms/image/C4D03AQFyIP42iurfog/profile-displayphoto-shrink_200_200/0?e=1538611200&v=beta&t=tL-v7wEF7VO7t5MAmpfrvAY8xd_IT6EmfuDayfM31rI'
        },
        {
          id: uuid(),
          name: 'Barbara de Graaf',
          phone: '+31 6 33 22 24 91',
          email: 'barbara@creativemedia.nl',
          avatar: 'https://media.licdn.com/dms/image/C4D03AQG7UCI84ytChw/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=0FWLp10b_4tOdETSGx6PaSPGg1EQNNeYU685-xE9MV8'
        },
        {
          id: uuid(),
          name: 'Astrid Kersenboom',
          phone: '+31 6 48 44 33 28',
          email: 'astrid.kersenboom@nos.nl',
          avatar: 'https://pbs.twimg.com/profile_images/795441920948441088/yHjo98GZ_400x400.jpg'
        }
      ],
      contactData: {
        id: uuid(),
        name: '',
        phone: '',
        email: '',
        avatar: '',
      }
    }
    this.removeItem = this.removeItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Functions to handle multiple onchange
  onChangeName = e => {
    e.preventDefault();
    this.setState({
      contactData: {
        name: e.target.value,
        phone: this.state.contactData.phone,
        email: this.state.contactData.email,
        avatar: this.state.contactData.avatar
      }
    })
  }

  onChangePhone = e => {
    e.preventDefault();
    this.setState({
      contactData: {
        name: this.state.contactData.name,
        phone: e.target.value,
        email: this.state.contactData.email,
        avatar: this.state.contactData.avatar
      }
    })
  }

  onChangeEmail = e => {
    e.preventDefault();
    this.setState({
      contactData: {
        name: this.state.contactData.name,
        phone: this.state.contactData.phone,
        email: e.target.value,
        avatar: this.state.contactData.avatar
      }
    })
  }

  onChangeAvatar = e => {
    e.preventDefault();
    this.setState({
      contactData: {
        name: this.state.contactData.name,
        phone: this.state.contactData.phone,
        email: this.state.contactData.email,
        avatar: e.target.value
      }
    })
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      contacts: [...this.state.contacts, {
        id: uuid(), 
        name: this.state.contactData.name, 
        phone: this.state.contactData.phone,
        email: this.state.contactData.email,
        avatar: this.state.contactData.avatar
      }]
    });
    this.toggle();
  }

  // Function to remove a item
  removeItem(key) {
    const filteredItems = this.state.contacts.filter(contact => {
      return contact.id !== key
    })
    this.setState({
      contacts: filteredItems,
    })
  }


  // Function for our modal
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const renderedData = (this.state.contacts.map((contact) => {
      return (
        <ListGroupItem key={contact.id}>
          <div className="contact-img"><img src={contact.avatar} alt={this.props.name} /></div>
          <div className="contact-name">{contact.name}</div>
          <div className="contact-phone">{contact.phone}</div>
          <div className="contact-email">{contact.email}</div>
          <div className="contact-del-btn"><Button color="danger" onClick={() => {this.removeItem(contact.id)}}>&times;</Button></div>
        </ListGroupItem>
      )
    }))
    return(
      <Container>
      <h1>Contact manager</h1>
      <Button color="success" className='btn-add-contact' onClick={this.toggle}>Add Contact</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add contact</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input type="text" name="name" placeholder="Name" onChange={this.onChangeName} required />
              <Input type="number" name="phone" placeholder="Phone Number" onChange={this.onChangePhone} required />
              <Input type="email" name="email" placeholder="E-mail" onChange={this.onChangeEmail} required />
              <Input type="avatar" name="avatar" placeholder="Avatar url" onChange={this.onChangeAvatar} required />
              <Button color="success"style={{marginBottom: '2rem', marginTop: '2rem'}} block>Add Item</Button>
            </FormGroup>
          </Form>
          </ModalBody>
        </Modal>
      <ListGroup>
        {renderedData}
      </ListGroup>
      </Container>
    )
  }
}

export default ContactList;