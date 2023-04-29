import { useEffect, useState } from 'react';
import React from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList ';
import { nanoid } from 'nanoid';

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   componentDidMount() {
//     const initialContacts = JSON.parse(localStorage.getItem('contacts'));
//     initialContacts && this.setState({ contacts: initialContacts });
//   }

//   createContact = newItem => {
//     const isInContacts = this.state.contacts.some(
//       contact => contact.name.toLowerCase() === newItem.name.toLowerCase()
//     );
//     if (isInContacts) {
//       alert(`${newItem.name} is already in contacts.`);
//       return;
//     }
//     const newContact = { ...newItem, id: nanoid() };
//     this.setState(prevState => {
//       return {
//         contacts: [...prevState.contacts, newContact],
//       };
//     });
//   };

//   onFindInput = e => {
//     this.setState({ filter: e.target.value });
//   };

//   createFilteredList = () => {
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
//     );
//   };
//   deleteContact = e => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(
//           contact => contact.id !== e.target.id
//         ),
//       };
//     });
//   };

//   render() {
//     const filteredList = this.createFilteredList();
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           fontSize: 40,
//           color: '#010101',
//         }}
//       >
//         <h3>Phonebook</h3>
//         <ContactForm createContact={this.createContact} />
//         <h3>Contacts</h3>
//         {this.state.contacts.length > 0 ? (
//           <>
//             <Filter onFindInput={this.onFindInput} />
//             <ContactList
//               contactsList={filteredList}
//               deleteContact={this.deleteContact}
//             />
//           </>
//         ) : (
//           <p>No contacts</p>
//         )}
//       </div>
//     );
//   }
// }

export const App = () => {
  const initialValue = () => JSON.parse(localStorage.getItem('contacts')) ?? [];

  const [contacts, setContacts] = useState(initialValue);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = newItem => {
    const isInContacts = contacts.some(
      contact => contact.name.toLowerCase() === newItem.name.toLowerCase()
    );
    if (isInContacts) {
      alert(`${newItem.name} is already in contacts.`);
      return;
    }
    const newContact = { ...newItem, id: nanoid() };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const onFindInput = ({ target: { value } }) => setFilter(value);

  const createFilteredList = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = ({ target: { id } }) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h3>Phonebook</h3>
      <ContactForm createContact={createContact} />
      <h3>Contacts</h3>
      {contacts.length > 0 ? (
        <>
          <Filter onFindInput={onFindInput} />
          <ContactList
            contactsList={createFilteredList()}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        <p>No contacts</p>
      )}
    </div>
  );
};
