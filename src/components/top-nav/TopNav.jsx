import React, { useEffect, useState } from 'react'
import { Button, Nav, NavDropdown } from 'react-bootstrap'
import { Bell, Person, PersonFill, PersonFillLock, Question, QuestionCircle, Search } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { HOME, SIGN_IN } from '../../constants/routes';

const TopNav = () => {
      const [person, setPerson] = useState({});
      const navigate = useNavigate();
      useEffect(() => {
        const user = window.localStorage.getItem("user");
        if(user === null){
            navigate(SIGN_IN)
        }
        setPerson(JSON.parse(user));
      },[]);
    return (
        <div className='top-nav'>
            <Button className='search-btn'>
                <Search size={14} />
            </Button>
            <div className="">
            <Button className='transparent-btn'>
                <QuestionCircle size={14} />
            </Button> 
            <Button className='transparent-btn'>
                <Bell size={14} />
            </Button>
            <Button className='avatar-btn'>
               <PersonFill/>
            </Button>
            <Nav>

            <NavDropdown title={`${person.first_name} ${person.last_name}`} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Email<br />
              <span className='caption-text'>{person.email}</span></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Role <br />
                <span className='caption-text'>{person.role}</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Username <br/>
              <span className='caption-text'>{person.username}</span></NavDropdown.Item>
            </NavDropdown>
            
            </Nav>
            </div>
        </div>
    )
}

export default TopNav